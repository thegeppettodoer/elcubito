import React, {
  useState,
  useEffect,
  Component,
  Fragment,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  LogBox,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  windowWidth as width,
  windowHeight as height,
} from "../../utils/Dimentions";

import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import ViewPager from "@react-native-community/viewpager";
import VideoPlayer from "../../componentes/objetos/VideoPlayer";

import { AuthContext } from "../../componentes/navigation/AuthProvider";

const Container = styled(ViewPager)`
  height: ${height}px;
  flex: 1;
  background: #000;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const MisWf = ({ navigation }) => {
  const {
    user,
    logout,
    language,
    datosmiswf,
    setDatosmiswf,
    obtenerDatosMisWF,
    pagedatosmiswf,
    setPagedatosmiswf,
    resetDatosMisWF,
  } = useContext(AuthContext);

  const [selected, setSelected] = useState(0);
  const [empezar, setEmpezar] = useState(true);
  const [playEmpezar, setPlayEmpezar] = useState(true);

  const [dataVideos, setDataVideos] = useState({});

  const [refreshing, setRefreshing] = useState(false);
  const [ultimo, setUltimo] = useState(false);

  const setRef = useRef(ViewPager);

  const loadDataVideos = async (ret) => {
    console.log(">|||||| loadDataVideos> select-", selected, "--", ret);

    if (ret) {
    } else {
      ret = selected;
    }
    if (!dataVideos[0] && ret === 0) {
      setPagedatosmiswf(0);
      obtenerDatosMisWF().then((res) => {
        setDataVideos(res);
        setDatosmiswf(res);
        console.log(">MisWf traer todo", ret);
      });
    }
    if (dataVideos[0] && ret >= 1) {
      var misDatos = dataVideos.slice();

      if (!!misDatos.find((e) => e.id.toString() == (ret + 2 + 1).toString())) {
        //no carga
      } else {
        //si carga
        if (ultimo) {
          console.log("ultimo");
          setTimeout(() => setUltimo(false), 300); //  ultimo
        }

        if (ret >= 1 && !misDatos.find((e) => e.id.toString() === ret + 1)) {
          console.log("Si debe cargar data de firebase", ret);
        }

        obtenerDatosMisWF(ret).then((res) => {
          if (!!res) {
            if (
              //dgb >=2
              ret >= 1 &&
              !misDatos.find((e) => e.id.toString() === res.id.toString())
            ) {
              //add/push new data
              let cuenta = [];
              cuenta = misDatos.push(res);
              setDataVideos(misDatos);
              setDatosmiswf(misDatos); //provider set
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    // console.log(">MisWf > setUltimo(true)---- useEffect >", selected);
    loadDataVideos(selected).then((res) => {});
  }, [selected]);

  // LogBox.ignoreAllLogs(); //Ignore all log notifications

  const LoadArrayMap = () => {
    if (Array.isArray(dataVideos)) {
      return dataVideos.map((item, index) => {
        return (
          <View
            index={item.id}
            key={item.id}
            style={{ flex: 0, backgroundColor: "#000" }}
            collapsable={false}
          >
            <VideoPlayer
              video={item.videoUrl}
              poster={item.poster}
              isPlay={selected === index && empezar}
              xkey={index}
              reiniciar={false}
              height={height}
            />

            <Gradient
              key={item.id + 888888}
              locations={[0, 0.26, 0.6, 1]}
              colors={[
                "rgba(26,26,26,0.6)",
                "rgba(26,26,26,0)",
                "rgba(26,26,26,0)",
                "rgba(26,26,26,0.6)",
              ]}
            >
              {/* <View
                collapsable={false}
                key={"vp" + item.id}
                style={{
                  zIndex: 1,
                  position: "absolute",
                  alignSelf: "center",
                  alignItems: "center",
                  marginTop: 0,
                  backgroundColor: "red",
                }}
              > */}
                <TouchableOpacity
                  key={"t" + item.id}
                  onPress={() => {
                    empezar ? setEmpezar(false) : setEmpezar(true);
                  }}
                  underlayColor="transparent"
                  style={{zIndex:1}}
                >
                  <View
                    collapsable={false}
                    key={"v" + item.id}
                    style={{
                      width: width,
                      height: height,
                      alignItems: "center",
                      backgroundColor: "transparent",
                      zIndex: 1,
                    }}
                  ></View>
                </TouchableOpacity>
              {/* </View> */}

              <View
                collapsable={false}
                key={"v" + item.id}
                style={{
                  zIndex: 2,
                  position: "absolute",
                  alignSelf: "center",
                  alignItems: "center",
                  marginTop: height - 100,
                }}
              >
                <Button
                  key={"b" + item.id}
                  title={item.titulo}
                  color="red"
                  onPress={() => {
                    setPlayEmpezar(false);
                    setEmpezar(false);
                    navigation.navigate("DetalleMisWf", {
                      id: item.id,
                      item: item,
                    });
                  }}
                />
                
              </View>
            </Gradient>
          </View>
        );
      });
    } else {
      return (
        <View
          key="n1"
          collapsable={false}
          style={{ backgroundColor: "#000", flex: 1 }}
        >
          <Text>{"No cargo map-"}</Text>
        </View>
      );
    }
  };

  return language ? (
    <SafeAreaView key="s1">
      <ScrollView
        key="sc1"
        refreshControl={
          <RefreshControl
            enabled={selected === 0 ? true : false}
            refreshing={refreshing}
            onRefresh={() => {
              if (selected === 0) {
                setRefreshing(true);
                setPagedatosmiswf(0);
                setDatosmiswf(null);
                setDataVideos(null);
                setSelected(0);
                obtenerDatosMisWF(0).then((res) => {
                  setDataVideos(res);
                  setDatosmiswf(res); //provider set
                  setRefreshing(false);
                });
              } else {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        <Fragment key="miswf01">
          <Container
            ref={setRef}
            overScrollMode={"never"}
            scrollEnabled={true}
            orientation="vertical"
            transitionStyle="scroll"
            onPageScroll={(e) => {
              if (Array.isArray(dataVideos)) {
                setPlayEmpezar(true);
                if (
                  e.nativeEvent.offset === 0 &&
                  selected > 0 &&
                  selected + 1 === dataVideos.length
                ) {
                  setUltimo(true); //ultimo
                  loadDataVideos(selected - 1);
                } else {
                  setUltimo(false); //ultimo
                }
              }
            }}
            onPageSelected={(e) => {
              if (!refreshing && Array.isArray(dataVideos)) {
                let i = e.nativeEvent.position;

                setSelected(i);
                setEmpezar(true);
                setPagedatosmiswf(i);
                setPlayEmpezar(true);
              }
            }}
            keyboardDismissMode={() => {
              console.log(" keyboardDismissMode ");
            }}
            initialPage={0}
            style={{ backgroundColor: "transparent" }}
            key={"co1"}
          >
            {LoadArrayMap()}
          </Container>
        </Fragment>
        {Array.isArray(dataVideos) &&
        selected + 1 === dataVideos.length &&
        ultimo === true ? (
          <View
            collapsable={false}
            style={{
              backgroundColor: "#000",
              flex: 1,
              height: 50,
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
                marginTop: 15,
                color: "#fff",
              }}
            >
              {"...Loading..."}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View>
      <Text>{"No loading..."}</Text>
    </View>
  );
};

export default MisWf;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  button: {
    marginBottom: 30,
    width: 300,
    height: 300,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
});
