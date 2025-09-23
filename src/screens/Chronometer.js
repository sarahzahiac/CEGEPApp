import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Chronometer = () => {
  const [time, setTime] = useState(0); // en ms
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startChrono = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
  };

  const stopChrono = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const resetChrono = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };

  // Format mm:ss:ms
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return (
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + '.' +
      String(centiseconds).padStart(2, '0')
    );
  };

  return (
    <View style={styles.container}>
        <Text style={{position: 'absolute', top: 100, fontSize: 44, fontWeight: '600', color: 'black', backgroundColor:'#F1EDF8', padding:10,borderRadius:10,}}>Chronomètre</Text>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <TouchableOpacity onPress={startChrono} activeOpacity={0.7}>
            <Text style={[styles.buttonText, styles.start]}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={stopChrono} activeOpacity={0.7}>
            <Text style={[styles.buttonText, styles.stop]}>Stop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={resetChrono} activeOpacity={0.7}>
            <Text style={[styles.buttonText, styles.reset]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4E7D3',
  },
  time: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#F1EDF8',
    elevation: 4,
    shadowColor: '#636e72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#636e72',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 1,
  },
  start: {
    backgroundColor: '#C1E1C1',
    borderRadius: 24,
  },
  stop: {
    backgroundColor: '#FAA0A0',
    borderRadius: 24,
  },
  reset: {
    backgroundColor: '#C7DBF0',
    borderRadius: 24,
  },
});

export default Chronometer;