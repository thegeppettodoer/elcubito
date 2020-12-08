import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormButton from "../../componentes/objetos/FormButton";
import { AuthContext } from "../../componentes/navigation/AuthProvider";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-community/async-storage";

const Item = Picker.Item;

const SetupScreen = () => {
  const { user, logout, registerLanguage, language, setLanguage } = useContext(
    AuthContext
  );
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    AsyncStorage.getItem("language").then((res) => {
      if (res) {
        setIdioma(res);
      } else {
        setIdioma("es");
      }
    });
  }, []);

  return (
    language && (
      <View style={styles.container}>
        <Text style={styles.text}>{language.textConfigurar}</Text>

        <Picker
          selectedValue={idioma}
          itemStyle={{
            fontFamily: "LatoRegular",
            fontSize: 18,
          }}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setIdioma(itemValue);
            registerLanguage(itemValue);
          }}
          mode="dropdown"
        >
          <Item label="Español" value="es" />
          <Item label="English" value="en" />
        </Picker>

        <FormButton buttonTitle="Logout" onPress={() => logout()} />
      </View>
    )
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#414347",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingBottom: 40,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: 200,
    color: "#2e64e5",
    fontFamily: "LatoRegular",
    fontSize: 18,
    marginBottom: 0,
  },
});
