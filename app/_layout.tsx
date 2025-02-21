import { View, Text } from "react-native";
import { Slot,SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { GentiumPlus_400Regular, GentiumPlus_700Bold } from '@expo-google-fonts/gentium-plus';
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

import "../global.css";
import { useEffect } from "react";
import GlobalProvider from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded,error] = useFonts({
      GentiumPlusRegular: GentiumPlus_400Regular,
      GentiumPlusBold: GentiumPlus_700Bold,
      Nunitoregular:Nunito_400Regular,
      Nunitobold:Nunito_700Bold,
    });

    useEffect(()=>{
      if(error) throw error
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    },[fontsLoaded,error]);

    // if(!fontsLoaded){
    //   return AppLo
    // }

  return (
    
    <GlobalProvider>
    <Stack
      screenOptions={{
        headerShown: false, // Disable headers globally
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  </GlobalProvider>
  

  );
}