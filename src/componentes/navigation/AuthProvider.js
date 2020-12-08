import React, { createContext, useState } from "react";

// import { GoogleSignin } from '@react-native-community/google-signin';
// import { LoginManager, AccessToken } from "react-native-fbsdk";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import Language from "../../utils/Language";
import Config from "../../utils/Config";

if (!firebase.apps.length) {
  firebase.initializeApp(Config);
} else {
  firebase.app();
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(null);
  const [datosmiswf, setDatosmiswf] = useState(null);
  const [alldatosmiswf, setAlldatosmiswf] = useState(null);
  const [pagedatosmiswf, setPagedatosmiswf] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage,
        datosmiswf,
        setDatosmiswf,
        pagedatosmiswf,
        setPagedatosmiswf,
        alldatosmiswf,
        setAlldatosmiswf,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(">AuthProvider>login>", e);
          }
        },
        
        fbLogin: async () => {
          try {
            console.log(">AuthProvider>fbLogin> 1 !Facebook.initializeAsync");

            await Facebook.initializeAsync({
              appId: "383007856067427", //APP_ID
            });

         

            const result = await Facebook.logInWithReadPermissionsAsync({
              permissions: ["public_profile", "email"],
            });

            const { type, token } = result;

         

            if (!token) {
              throw ">AuthProvider>Token no obtenido!";
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
              token
            );
            // Sign-in the user with the credential
            await firebase.auth().signInWithCredential(facebookCredential);
          } catch (error) {
            console.log(">AuthProvider>error>", { error });
          }
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        registerLanguage: async (idioma) => {
          try {
            let wordLanguage = await Language.find((e) => e.corto == idioma);
            if (wordLanguage) {
              setLanguage(wordLanguage);
              AsyncStorage.setItem("language", idioma);
            }
          } catch (e) {
            console.log("> AuthProvider > registerLanguage > err>", e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
            await AsyncStorage.clear();
            console.log(">AuthProvider>logout>", "OK");

          } catch (e) {
            console.log(">AuthProvider>logout>", e);
          }
        },
        resetDatosMisWF: async () => {
          setPagedatosmiswf(1);
          setDatosmiswf(null);
          return 1;
        },
        obtenerDatosMisWF: async (ret) => {
          try {
            var newdatosmiswf = [];

            if (ret === 0) {
              setPagedatosmiswf(0);
              setDatosmiswf(null);
              console.log('>AuthProvider > Reiniciar > ret===0 >',ret,pagedatosmiswf);
            } else {
              if (ret > 0) {
                ret = ret;
              } else {
                ret = pagedatosmiswf;
              }
            }

            let val = ret >= 1;
            let page = ret + 2; //+1
            let refInitial = val ? "peliculas/" + page : "peliculas";
            let limiteInitial = val ? 10000 : 3;

            if (datosmiswf && ret <= 2 && ret !== 0 && !val) {
              console.log('>AuthProvider> obtenerDatosMisWF>return el mismo datosmiswf');
              return datosmiswf;
            }

            // console.log(">AuthProvider obtenerDatosMisWF > ok -- val>",val,
            // '-!!datosmiswf>',!!datosmiswf,'<ref>',refInitial, '--limiteInitial--',
            // limiteInitial , '+++0 : ret>',ret,'-page-',page);

            newdatosmiswf = await firebase
              .database()
              .ref(refInitial)
              .orderByChild("id")
              .limitToFirst(limiteInitial) //,limitToLast(2)
              .once("value")
              .then((snapshot) => {
                setPagedatosmiswf(page);
                return snapshot.val();
              });

            setDatosmiswf(newdatosmiswf);

            return newdatosmiswf;
          } catch (e) {
            console.log(">datosMisWF > AuthProvider>obtenerDatosMisWF>err>", e);
          }
        },
 
 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
