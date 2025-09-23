import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { userTime } from "../hooks/userTime";

export default function TimerScreen() {
  const [input, setInput] = useState("");
  const { minutes, seconds, isRunning, start, pause, stop, timeLeft } = userTime();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>

      <TextInput
        style={styles.input}
        placeholder="Minutes"
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
      />

      {/* Boutons personnalisés */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.start]}
          onPress={() => start(parseInt(input) || 0)}
        >
          <Text style={styles.buttonText}>
            {timeLeft > 0 && !isRunning ? "Resume" : "Start"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.stop]} onPress={pause}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.reset]} onPress={stop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.time}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4E7D3",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2f3640",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 150,
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  time: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#2f3640",
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F1EDF8",
    elevation: 4,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginTop: 10,
  },
  button: {
    marginHorizontal: 6,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 18,
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
