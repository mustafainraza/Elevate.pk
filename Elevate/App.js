import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from './Components/start';
import Home from './Components/Home';
import { NavigationContainer } from "@react-navigation/native";
import Drawer_Nav from './Components/Drawer_Nav';
import Details from './Components/Details';
import TrackUpdates from './Components/TrackUpdates';
import { AntDesign } from "@expo/vector-icons";
import Rewards from './Components/Reward.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="start"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name='Drawer_Nav' component={Drawer_Nav} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Product Details",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#F23B25",
            },
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Track Progress"
          component={TrackUpdates}
          options={{
            title: "Updates",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#F23B25",
            },
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          options={{
            title: "Rewards",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#F23B25",
            },
          }}
          name="Rewards"
          component={Rewards}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
