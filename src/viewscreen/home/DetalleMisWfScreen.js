import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet ,} from "react-native";
import { AuthContext } from "../../componentes/navigation/AuthProvider";
import AsyncStorage from "@react-native-community/async-storage";
import {
  windowWidth as width,
  windowHeight as height,
} from "../../utils/Dimentions";
import VideoPlayer from "../../componentes/objetos/VideoPlayer";
import styled from "styled-components/native";
import Info from "../../componentes/objetos/Info";
import { AntDesign } from "@expo/vector-icons";

const Center = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 50px;
  padding: 0px;
`;
// console.log(">deta?util>height>",height);
const DetalleMisWfScreen = ({ navigation, route }) => {
  const { user, logout, registerLanguage, language, setLanguage } = useContext(
    AuthContext
  );
  const [idioma, setIdioma] = useState("es");
  const [param, setParam] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("language").then((res) => {
      if (res) {
        setIdioma(res);
      } else {
        setIdioma("es");
      }
    });

    setParam(route.params);
  }, []);

 

  return param.item&&language ? (
    <View style={styles.container}>
      <VideoPlayer
        video={param.item.videoUrl}
        poster={param.item.poster}
        isPlay={true}
        xkey={param.item.id}
        reiniciar={false}
        height={height  - 200}
        control={true}
      />
      <View key={"d1"} style={styles.containerAbajo}>
        <Center key={"c" + param.id}>
          <Info data={param.item} />
        </Center>
      </View>
      
      
      <AntDesign
          key={"a1back"+param.id}
            name="back"
            size={40}
            color="#B00020"
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={styles.retroceder}
          />
    </View>
  ) : (
    <View>
      <Text>{"...No carga..."}</Text>
    </View>
  );
};

export default DetalleMisWfScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  containerAbajo: {
    marginTop: 20,
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
  retroceder:{
    position:"absolute",
    left:5,
    top:27,
    // zIndex: 1,
  }
});
