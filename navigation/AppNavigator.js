import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CounterScreen from '../screens/CounterScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                title:
                    'Accueil'
            }} />
            <Tab.Screen name="Counter" component={CounterScreen} options={{
                title: 'Compteur'
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                title: 'Paramètres'
            }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={Tabs} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}