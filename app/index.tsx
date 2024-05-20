import React, { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link , Redirect} from "expo-router";
import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import SignUpScreen from "@/components/SignUpScreen";
import SignInScreen from "@/components/SignInScreen";
import * as SecureStore from "expo-secure-store";


const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
function HomeScreen() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
  });
  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      justifyContent: "center",
      alignItems: "center"
      
    }}>
      <Text style={{ fontFamily: 'Inter-Black', fontSize: 28 }}>Welcome to the App</Text>
      <Link href="/about">About</Link>
    </View>

  );
}
const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
export default function Index() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (

    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey!}>
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <HomeScreen />
          <SignOut />
        </SignedIn>

        <SignedOut>
          {isSignUp ? <SignUpScreen /> : <SignInScreen />}
          <Text>{isSignUp ? "Already have an account?" : "Create an account"}</Text>
          <Button
            title={isSignUp ? "Sign In" : "Sign Up"}
            color="black"
            
            onPress={() => setIsSignUp(!isSignUp)}
          />
         
         
         
        </SignedOut>
        
      </SafeAreaView>

    </ClerkProvider>
    
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});