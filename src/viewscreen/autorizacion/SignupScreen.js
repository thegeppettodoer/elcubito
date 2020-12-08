import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import FormInput from "../../componentes/objetos/FormInput";
import FormButton from "../../componentes/objetos/FormButton";
import SocialButton from "../../componentes/objetos/SocialButton";
import { AuthContext } from "../../componentes/navigation/AuthProvider";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { register, language, setLanguage } = useContext(AuthContext);

  return language ? (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.text1}>{language.aplicacion}</Text>

          <Text style={styles.text}>{language.sign.crearCuenta}</Text>
          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText={language.sign.email}
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText={language.sign.password}
            iconType="lock"
            secureTextEntry={true}
          />

          <FormInput
            labelValue={confirmPassword}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText={language.sign.repetirPassword}
            iconType="lock"
            secureTextEntry={true}
          />

          <FormButton
            buttonTitle={language.sign.botonCrear}
            onPress={() => register(email, password)}
          />

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              {language.sign.registrarPotica}{" "}
            </Text>
            <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
              <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
                {language.sign.registrarPoticaLinkTerminos}
              </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}> y </Text>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              {language.sign.registrarPoticaLinkPoliticas}
            </Text>
          </View>

          {Platform.OS === "android" ? (
            <View>
              <SocialButton
                buttonTitle={language.sign.iniciarFacebook}
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {
                  register("email", "password");
                }}
              />
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.navButtonText}>
              {language.sign.tengoCuenta}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View>
      <Text>{"No loading..."}</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    marginTop: 0,
  },
  text1: {
    fontFamily: "KufamSemiBoldItalic",
    fontSize: 28,
    marginBottom: 0,
    color: "#068ccf",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  text: {
    fontFamily: "KufamSemiBoldItalic",
    fontSize: 28,
    marginBottom: 0,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 0,
    marginBottom: 0,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "LatoRegular",
    marginTop: 10,
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "LatoRegular",
    color: "grey",
  },
});
