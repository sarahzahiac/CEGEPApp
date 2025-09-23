import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

import useAlarm from "../hooks/useAlarm";

export default function ScreenAlarm() {
  const {
    hourr,
    minutee,
    ampm,
    setHour,
    setMinute,
    setAmpm,
    currentAlarmText,
    scheduleAlarm,
    turnOffAlarm,
  } = useAlarm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Alarm App</Text>

      {currentAlarmText ? (
        <View style={styles.activeCard}>
          <Text style={styles.activeTitle}>Alarme active</Text>
          <Text style={styles.activeTime}>{currentAlarmText}</Text>
        </View>
      ) : (
        <Text style={styles.noAlarm}>Aucune alarme active</Text>
      )}

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Heure"
          keyboardType="numeric"
          value={hourr}
          onChangeText={setHour}
        />

        <TextInput
          style={styles.input}
          placeholder="Minute"
          keyboardType="numeric"
          value={minutee}
          onChangeText={setMinute}
        />

        <TextInput
          style={styles.input}
          placeholder="am/pm"
          autoCapitalize="none"
          value={ampm}
          onChangeText={setAmpm}
        />
      </View>

      <Pressable style={styles.btnPrimary} onPress={scheduleAlarm}>
        <Text style={styles.btnText}>Activer l'alarme</Text>
      </Pressable>

      <Pressable
        style={[styles.btnPrimary, { backgroundColor: "#b43ce7ff" }]}
        onPress={turnOffAlarm}
      >
        <Text style={styles.btnText}>Éteindre l'alarme</Text>
      </Pressable>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  activeCard: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  activeTitle: {
    color: "#6B7280", 
    fontSize: 12, 
    marginBottom: 4 
},

  activeTime: {
    fontSize: 28, 
    fontWeight: "700", 
},

  noAlarm: {
    textAlign: "center", 
    color: "#6B7280", 
    marginBottom: 10 
},

  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
},
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
},

  btnPrimary: {
    backgroundColor: "#60748aff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
},

  btnText: {
    color: "#fff",
    fontWeight: "700" 
},
});
