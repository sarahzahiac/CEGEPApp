import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { timeZones } from "../data/timezones";
import TimeZoneContext from "../context/TimeZoneContext";

const TimeZoneScreen = () => {
  const [selectedZones, setSelectedZones] = useState(null);

  const changeTimeZone = (tz) => {
    setSelectedZones(tz);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Fuseaux sélectionnés :</Text>

        {selectedZones ? (
          <TimeZoneContext
            continent={selectedZones.continent}
            city={selectedZones.city}
          ></TimeZoneContext>
        ) : (
          <Text>Aucun fuseau sélectionné</Text>
        )}

        <Text style={styles.title}>Tous les fuseaux horaires :</Text>

        <View style={styles.container}>
          <FlatList
            data={timeZones}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => changeTimeZone(item)}>
                <View style={styles.button}>
                  <Text style={styles.text}>
                    {item.city}, {item.continent}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#ffffffff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#b6d9e9ff",
    padding: 17,
    marginVertical: 4,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  selected: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0984e3",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#2f3640",
  },

  text: {
    fontWeight: "bold",
    color: "#2f3640",
  },
});

export default TimeZoneScreen;
