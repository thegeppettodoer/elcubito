import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./AuthProvider";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
  const { user, setUser, language, setLanguage, registerLanguage } = useContext(
    AuthContext
  );
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (!language) {
      AsyncStorage.getItem("language").then((res) => {
        let idioma=res?res:"es";
        registerLanguage(idioma).then((resu) => {
        });
      });
    }  
    if (initializing) setInitializing(false);
  };
  
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
