import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import FormButton from "../../componentes/objetos/FormButton";
import { AuthContext } from "../../componentes/navigation/AuthProvider";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-community/async-storage";
import WebView from "react-native-webview";
import { windowWidth, windowHeight } from "../../utils/Dimentions";

 

import ShakeEventExpo from "../../utils/Muevelo";
const cubo = require("../../cubo.html");

const Item = Picker.Item;

const CuboScreen = () => {
  const { user, logout, registerLanguage, language, setLanguage } = useContext(
    AuthContext
  );
  const [idioma, setIdioma] = useState("es");
  const [keyWeb, setKeyWeb] = useState("keywebview1");
  const [count, setCount] = useState(1);

  // const _onRotateGestureEvent =() =>{
  //   alert("cambio");

  // } 
   
  // const _onRotateHandlerStateChange = event => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     this._lastRotate += event.nativeEvent.rotation;
  //     this._rotate.setOffset(this._lastRotate);
  //     this._rotate.setValue(0);
  //     alert("cambio2");
  //   }
  // };
  
  useEffect(() => {
    AsyncStorage.getItem("language").then((res) => {
      if (res) {
        setIdioma(res);
      } else {
        setIdioma("es");
      }
    });

    ShakeEventExpo.addListener(() => {
      //add your code here
      setCount(count+1)
      setKeyWeb("keyWeb" +count)
      console.log('Shake Shake Shake. '+keyWeb);

    });

    return () => {
      ShakeEventExpo.removeListener();
      // setCount(count-1)
  
    }
  }, [keyWeb]);

  // useEffect(() => {

  // }, []);

  let WebViewRef;
  let subscription;
  return (
    language && (
      <View style={styles.container}>
    
  

        {/* <WebView
          originWhitelist={["*"]}
          source={{ html: "<h1 style='color:black'>Hello world</h1>" }}
          style={{ marginTop: 140 }}
          /> */}

        <WebView
          key={keyWeb}
          ref={(WEBVIEW_REF) => (WebViewRef = WEBVIEW_REF)}
          startInLoadingState={true}
          //  originWhitelist={["*"]}
          source={{
            uri: "http://www.mark-lundin.com/cube/index.html?hideNav=1",
          }}
          // source={{
          //   html: `
          // `,
          // }}
          // source={{
          //   html:
          //     "<html><body style='color:red'>Hello<br/>This is a test</body></html>",
          // }}
          style={{
            width: windowWidth,
            height: windowHeight - 0,
            backgroundColor: "blue",
            marginTop: 0,
          }}
        />

        {/* <WebView
          source={  cubo }
          style={{ marginTop: 0 }}
        /> */}

 
      </View>
    )
  );
};

export default CuboScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingBottom: 0,
    flexDirection: "column",
  },
  text: {
    fontSize: 20,
    color: "#000",
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

// <Picker
// selectedValue={idioma}
// itemStyle={{
//   fontFamily: "LatoRegular",
//   fontSize: 18,
// }}
// style={styles.picker}
// onValueChange={(itemValue, itemIndex) => {
//   setIdioma(itemValue);
//   registerLanguage(itemValue);
// }}
// mode="dropdown"
// >
// <Item label="Español" value="es" />
// <Item label="English" value="en" />
// </Picker>

{
  /* <Text style={styles.text}>{language.textConfigurar}</Text> */
}

{
  /* <FormButton buttonTitle="Logout" onPress={() => logout()} /> */
}
