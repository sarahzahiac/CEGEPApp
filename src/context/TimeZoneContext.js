import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';

const TimeZoneContext = ({continent, city}) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getTimeZone = async () => {
    try {
      const response = await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${continent}%2F${city}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
     getTimeZone();
    let interval = setInterval(() => {
      getTimeZone()
    }, 1000)
    return() => clearInterval(interval)
   
  }, [continent, city]);

  return (
  <View style={styles.card}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.city}>{city}</Text>
            <Text style={styles.sub}>{continent}</Text>
            <Text style={styles.sub}>{data.date}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.time}>{data.time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  city: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2f3640",
  },
  sub: {
    fontSize: 14,
    color: "#636e72",
  },
  right: {
    marginLeft: 10,
  },
  time: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0984e3",
  },
});

export default TimeZoneContext;