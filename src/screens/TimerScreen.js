import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { userTime } from "../hooks/userTime";

export default function TimerScreen() {
  const [input, setInput] = useState("");
  const { minutes, seconds, isRunning, start, pause, stop , timeLeft} = userTime();

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

      <View style={styles.row}>
        <Button
          title={timeLeft > 0 && !isRunning ? "Resume" : "Start"}
          onPress={() => start(parseInt(input) || 0)}
        />
        <View style={{ width: 12 }} />
                <Button
                  title="Pause"
                  onPress={pause}
                />
                <View style={{ width: 12 }} />
        <Button title="Stop" onPress={stop} />
      </View>

      <Text style={styles.timer}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 150,
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 6,
  },
  row: { flexDirection: "row", marginBottom: 20 },
  timer: { fontSize: 32, fontWeight: "bold" },
  done: { fontSize: 18, color: "green", marginTop: 10 },
});
