import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import TimerScreen from "../screens/TimerScreen";
import Chronometer from "../screens/Chronometer";
import AlarmScreen from '../screens/AlarmScreen';
import TimeZoneScreen from "../screens/TimeZoneScreen";
import ChonoIcon from '../assets/timer.png';
import globeIcon from '../assets/globe.png';
import AlarmIcon from '../assets/alarm.png';
import hourglass from '../assets/hourglass.png';
import { Image } from "react-native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Alarmes" component={AlarmScreen} options={{
        title: 'Alarmes',
        image: () => <Image source={AlarmIcon} style={{ width: 20, height: 20}} />,   
      }} />
      <Tab.Screen

        name="Chronometer"
        component={Chronometer}
        options={{
          title: "Chronomètre",
          image: () => <Image source={ChonoIcon} style={{ width: 20, height: 20 }} />,
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{ title: "Minuteur", 
        image: () => <Image source={hourglass} style={{ width: 20, height: 20 }} />,
         }}
      />

      <Tab.Screen
        name="Time Zone"
        component={TimeZoneScreen}
        options={{ title: "Time Zone",
        image: () => <Image source={globeIcon} style={{ width: 20, height: 20 }} />,
         }}
      />
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
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
