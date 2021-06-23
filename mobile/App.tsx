import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes';
import { AppLoading } from 'expo';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'

import { AuthProvider } from './src/context/auth';

export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthProvider>
        <Routes />
        <StatusBar style="dark" />
      </AuthProvider>
    );
  }
}