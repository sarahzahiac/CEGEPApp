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
          <View style={styles.activeCard}>
            <TimeZoneContext
              continent={selectedZones.continent}
              city={selectedZones.city}
            />
          </View>
        ) : (
          <Text style={styles.noSelection}>Aucun fuseau sélectionné</Text>
        )}

        <Text style={styles.title}>Tous les fuseaux horaires :</Text>

        <FlatList
          data={timeZones}
          keyExtractor={({ id }) => id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.touchable}
              underlayColor="#a3cde2"
              onPress={() => changeTimeZone(item)}
            >
              <View style={styles.button}>
                <Text style={styles.text}>
                  {item.city}, {item.continent}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4E7D3",
  },

  title: {
    fontSize: 24,
    marginVertical: 12,
    fontWeight: "700",
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
  },

  noSelection: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 16,
    fontSize: 16,
  },

  list: {
    paddingBottom: 20,
  },

  touchable: {
    borderRadius: 20,
    marginVertical: 6,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#C7DBF0",
    paddingVertical: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#636e72",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2f3640",
  },
});

export default TimeZoneScreen;
