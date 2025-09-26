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
      <Text style={styles.title}>Alarm App</Text>

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

      <Pressable style={[styles.button, styles.start]} onPress={scheduleAlarm}>
        <Text style={styles.buttonText}>Activer l'alarme</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.stop]} onPress={turnOffAlarm}>
        <Text style={styles.buttonText}>Éteindre l'alarme</Text>
      </Pressable>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F4E7D3",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2f3640",
    textAlign: "center",
  },

  activeCard: {
    backgroundColor: "#F1EDF8",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: "100%",
  },

  activeTitle: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 6,
    textAlign: "center",
  },

  activeTime: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2f3640",
    textAlign: "center",
  },

  noAlarm: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 16,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    width: "100%",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 16,
    elevation: 2,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  button: {
    marginTop: 10,
    borderRadius: 24,
    overflow: "hidden",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    width: "100%",
    elevation: 3,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#2f3640",
    letterSpacing: 1,
  },

  start: {
    backgroundColor: "#C1E1C1",
  },

  stop: {
    backgroundColor: "#FAA0A0",
  },

  reset: {
    backgroundColor: "#C7DBF0",
  },
});
