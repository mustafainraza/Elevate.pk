import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import IconButton from "./components/ui/IconButton";
import { AntDesign } from "@expo/vector-icons";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { Pressable } from "react-native";
const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
// ------------
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <View>
      <Text>Hello</Text>
      <Button onPress={() => authCtx.logout()} title="Logout"></Button>
    </View>
  );
}

// ------------
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
