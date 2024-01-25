import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignInPage from "./src/pages/SignInPage";
import { ThemeProvider, createTheme } from "@rneui/themed";
import "intl-pluralrules";
import "./src/lib/i18n";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "./src/store/userStore";
import * as Crypto from "expo-crypto";
import Reactotron from "reactotron-react-native";
import HomePage from "./src/pages/HomePage";
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "React Native App",
  })
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();
export default function App() {
  const userData = useUserStore((state) => state.userData);
  React.useEffect(() => {
    AsyncStorage.getItem("userData").then((data) => {
      if (data !== null) {
        useUserStore.setState({ userData: JSON.parse(data) });
      }
    });
    AsyncStorage.getItem("deviceToken").then((deviceToken) => {
      if (deviceToken !== null) {
        useUserStore.setState({ deviceToken });
      } else {
        AsyncStorage.setItem("deviceToken", Crypto.randomUUID());
        useUserStore.setState({ deviceToken: Crypto.randomUUID() });
      }
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          {!userData?.token ? <SignInPage /> : <HomePage />}
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
