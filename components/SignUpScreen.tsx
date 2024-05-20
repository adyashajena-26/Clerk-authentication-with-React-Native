import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button, Pressable} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

//   const [firstName, setFirstName] = React.useState("");
//   const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        // firstName,
        // lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      {!pendingVerification && (
        <View>
        
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor="#000"

              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          {/* <TouchableOpacity onPress={onSignUpPress}>
            <Text>Sign up</Text>
         </TouchableOpacity> */}
            <Button
                title="Sign Up"
                onPress={onSignUpPress}
                color="blue"/>
                  
               
                  
        </View>
      )}
      {pendingVerification && (
        <View>
          <View style={styles.input}>
            <TextInput
              value={code}
              placeholder="Code..."
              placeholderTextColor="#000"
              onChangeText={(code) => setCode(code)}
            />
        </View>
        <Button
                title="Verify Email"
                onPress={onPressVerify}
                color="blue"/>      
          
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    input: {
      borderWidth: 2,
      borderColor: 'blue',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
  });
  