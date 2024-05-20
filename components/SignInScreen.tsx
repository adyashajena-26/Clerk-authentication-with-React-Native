import React from "react";
import { Text, TextInput, TouchableOpacity, View , StyleSheet,Button} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <View>
      <View style={styles.input}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          placeholderTextColor="#000"
                  
                
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
      <Button
                title="Log In"
                onPress={onSignInPress}
                color="blue"/>   

     
      
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