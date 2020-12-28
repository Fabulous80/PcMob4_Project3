import { useState } from "react";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "../database/firebaseDB";

const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function login() {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed In!");
      })

      .catch((error) => {
        console.log("Error");
        setErrorText(error.message);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          autoCompleteType="password"
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.logInbutton} onPress={login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
        <TouchableOpacity onPress={null}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#ffc",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 10,
    textAlign: "center",
  },

  fieldTitle: {
    fontSize: 18,
    marginBottom: 10,
    //textAlign: "center",
  },

  input: {
    padding: 10,
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 10,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },

  logInbutton: {
    backgroundColor: "blue",
    width: 120,
    padding: 18,
    marginTop: 12,
    textAlign: "center",
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  signupText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },

  errorText: {
    color: "red",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
});
