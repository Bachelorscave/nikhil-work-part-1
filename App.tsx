import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigations/Navigators";
import { SafeAreaProvider } from 'react-native-safe-area-context';




function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <HomeStackNavigator/>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
