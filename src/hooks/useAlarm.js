// ------------------------------------------------------------
//          Hello ;) , voici une ptit explication
// on essaye de gerer une alarme locale avec expo-notifications
// - on commence par demander les permissions
// - puis on recharge l’état sauvegardé (id + heure affichée)
// - on planifie une notification "one-shot" à la prochaine occurrence
//   (me permet d'éviter le bug où la notif part tout de suite)
// - Permet annuler l’alarme
//
// ptite note: on ne replanifie pas automatiquement l'alarme à chaque jour.
//       juste la prochaine occurrence exacte.
//       (On pourra ajouter un replanificateur plus tard...)
// ------------------------------------------------------------

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";


// source : https://www.youtube.com/watch?v=u6puN0-GnKk&t=3020s

// Clés de stockage
const STORAGE_ID = "currentAlarmId";
const STORAGE_TIME = "currentAlarmTime";

export default function useAlarm() {

  // saisis par le user
  const [hourr, setHour] = useState("");     
  const [minutee, setMinute] = useState(""); 
  const [ampm, setAmpm] = useState("");      // "am" | "pm" | "" (24h)

  
  const [notificationId, setNotificationId] = useState("none"); // id renvoyé par Expo
  const [currentAlarmText, setCurrentAlarmText] = useState(""); 

  
  useEffect(() => {
    // Afficher la notif même si l’app est au premier plan 
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    //permissions + état sauvegardé
    (async () => {
      try {
        // Demander les permissions
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          const req = await Notifications.requestPermissionsAsync();
          status = req.status;
        }
        if (status !== "granted") {
          Alert.alert("Notifications désactivées", "Active les notifications dans les réglages.");
        }

        // Recharger l’état (si on avait déjà une alarme active)
        const savedId = await AsyncStorage.getItem(STORAGE_ID);
        const savedTime = await AsyncStorage.getItem(STORAGE_TIME);
        setNotificationId(savedId ? JSON.parse(savedId) : "none");
        setCurrentAlarmText(savedTime ? JSON.parse(savedTime) : "");
      } catch (e) {
        console.warn("Init useAlarm error:", e);
      }
    })();

    // quand l’utilisateur appuie sur la notif
    const sub = Notifications.addNotificationResponseReceivedListener(() => {});
    return () => sub?.remove?.();
  }, []);

  

  // affiche "HH:MM" (24h) si am/pm vide, sinon "hh:MM am/pm"
  const formatLabel = (h24, m, apm) => {
    if (!apm) {
      return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${apm}`;
  };

  // convertit en heure 24h 
  const normalizeHour24 = (rawHour, ampmStr) => {
    let h = parseInt(rawHour, 10);
    const ap = (ampmStr || "").trim().toLowerCase();
    if (ap === "pm") return (h % 12) + 12; // 12pm -> 12, 1pm -> 13, etc.
    if (ap === "am") return (h % 12);      // 12am -> 0
    return h; // mode 24h
  };

  // Donne la prochaine occurrence (aujourd’hui ou demain) pour h:m
  const nextOccurrenceDate = (h24, m) => {
    const now = new Date();
    const target = new Date();
    target.setSeconds(0);
    target.setMilliseconds(0);
    target.setHours(h24);
    target.setMinutes(m);
    if (target <= now) target.setDate(target.getDate() + 1);
    return target;
  };



  //On ppeut slm créer uen alarme a la fois 
  const scheduleAlarm = async () => {
    try {
      // peut pas avoir 2 alarmes actives en même temps
      if (notificationId !== "none") {
        Alert.alert("Déjà active", "Éteins l'alarme avant d'en créer une nouvelle.");
        return;
      }

      // validation basique des champs
      let h = parseInt(hourr, 10);
      let m = parseInt(minutee, 10);

      if (isNaN(h) || isNaN(m) || m < 0 || m > 59) {
        Alert.alert("Entrées invalides", "Heure/minute incorrectes.");
        return;
      }

      // mettre en 24h si user a mit am/pm
      h = normalizeHour24(h, ampm);

      // Calcule la date exacte 
      const fireDate = nextOccurrenceDate(h, m);

      // mettre la notif 
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Alarm",
          body: "Il est l'heure !",
          sound: true,
          data: { kind: "alarm" },
        },
        trigger: { type: "date", date: fireDate },
      });

      // Texte à afficher (HH:MM / hh:MM am/pm)
      const ap = (ampm || "").trim().toLowerCase();
      const label = formatLabel(h, m, ap);

      // sauvegarde 
      setNotificationId(id);
      setCurrentAlarmText(label);
      await AsyncStorage.setItem(STORAGE_ID, JSON.stringify(id));
      await AsyncStorage.setItem(STORAGE_TIME, JSON.stringify(label));

      // reset les inputs
      setHour("");
      setMinute("");
      setAmpm("");

      Alert.alert("Alarme activée", `à ${label}`);
    } catch (e) {
      console.warn("scheduleAlarm error:", e);
      Alert.alert("Erreur", "Impossible de programmer l'alarme.");
    }
  };

  // annule l’alarme en cours et enlever de l'affichage
  const turnOffAlarm = async () => {
    try {
      if (notificationId === "none") {
        Alert.alert("Aucune alarme active");
        return;
      }
      await Notifications.cancelAllScheduledNotificationsAsync();

      setNotificationId("none");
      setCurrentAlarmText("");

      await AsyncStorage.setItem(STORAGE_ID, JSON.stringify("none"));
      await AsyncStorage.setItem(STORAGE_TIME, JSON.stringify(""));
      Alert.alert("Alarme éteinte");

    } catch (e) {
      console.log("turnOffAlarm error:", e);
      Alert.alert("Erreur", "Impossible d'éteindre l'alarme.");
    }
  };

  return {
    
    hourr, minutee, ampm,
    setHour, setMinute, setAmpm,    
    currentAlarmText,
    notificationId,
    scheduleAlarm,
    turnOffAlarm,
  };
}
