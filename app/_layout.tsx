import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'


import { ClerkProvider } from '@clerk/clerk-expo';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key:string){
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {
      console.log(error)
    }
  },
  async saveToken(key:string,value:string){
    try {
      return SecureStore.setItemAsync(key,value)
    } catch (error) {
      console.log(error)
    }
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: true }} />
        </Stack>
    </ClerkProvider>
    
    
  );
}
