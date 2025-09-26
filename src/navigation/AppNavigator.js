import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import TimerScreen from "../screens/TimerScreen";
import Chronometer from "../screens/Chronometer";
import AlarmScreen from "../screens/AlarmScreen";
import TimeZoneScreen from "../screens/TimeZoneScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Alarmes") {
            iconName = "alarm-outline";
          } else if (route.name === "Chronometer") {
            iconName = "stopwatch-outline";
          } else if (route.name === "Timer") {
            iconName = "hourglass-outline";
          } else if (route.name === "Time Zone") {
            iconName = "globe-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2f3640",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Alarmes" component={AlarmScreen} />
      <Tab.Screen name="Chronometer" component={Chronometer} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Time Zone" component={TimeZoneScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
