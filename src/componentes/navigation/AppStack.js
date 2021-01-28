import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";

import {
  Platform,
  InteractionManager,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import HomeScreen from "../../viewscreen/home/HomeScreen";
import DetalleMisWfScreen from "../../viewscreen/home/DetalleMisWfScreen";
import SetupScreen from "../../viewscreen/configuracion/SetupScreen";
import CuboScreen from "../../viewscreen/cubo/CuboScreen";

import { AuthContext } from "./AuthProvider";
import Constants from "expo-constants";
import { windowHeight } from "../../utils/Dimentions";

const InicioStack = createStackNavigator();
function InicioStackScreen({ navigation }) {
  return (
    <InicioStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <InicioStack.Screen name="Home" component={HomeScreen} />
      <InicioStack.Screen name="DetalleMisWf" component={DetalleMisWfScreen} />
    </InicioStack.Navigator>
  );
}

const SetupStack = createStackNavigator();
function SetupStackScreen() {
  return (
    <SetupStack.Navigator
      screenOptions={{
        tabBar: {
          visible: false,
        },
        headerShown: false,
      }}
    >
      <SetupStack.Screen name="Setup" component={SetupScreen} />
    </SetupStack.Navigator>
  );
}

const CuboStack = createStackNavigator();
function CuboStackScreen() {
  return (
    <CuboStack.Navigator
      screenOptions={{
        tabBar: {
          visible: false,
        },
        headerShown: false,
      }}
    >
      <CuboStack.Screen name="Cubo" component={CuboScreen} />
    </CuboStack.Navigator>
  );
}

const Tab = createBottomTabNavigator(); //createMaterialBottomTabNavigator();
const xconfig = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function TabStack({ navigation }) {
  const { language, setLanguage } = useContext(AuthContext);
  const [colorClicked, setColorClicked] = useState("#000");
  const [isTabVisible, setIsTabVisible] = useState(true);
  var xtextHome = ".Home.";
  var xtextConfigurar = ".Opciones.";

  if (language) {
    xtextHome = language.textHome;
    xtextConfigurar = language.textConfigurar;
  }

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: "blue",
        display: isTabVisible ? null : "none",
        backgroundColor: colorClicked,
        position: "absolute",
        zIndex: 99,
        flex: 1,
        // flexDirection:"row"
      }}
      tabBarOptions={{
        activeTintColor: "#edebeb",
        inactiveTintColor: "#edebeb",
        showIcon: true,
        style: styles.navigator,
        // labelStyle: {
        // position: "absolute",
        // top: Constants.vh(35),
        //fontSize: Constants.vh(18),
        // },
      }}
      options={{ headerShown: false }}
      screenOptions={{
        headerStyle: {
          headerShown: false,
        },
      }}
    >
      {/* //   tabBar={(props) => <CustomTabBar {...props} />}
    // >
    //   <Tab.Screen name="InicioStack" component={InicioStackScreen} key="1" />
    //   <Tab.Screen name="CuboStack" component={CuboStackScreen} key="2"/>
    //   <Tab.Screen name="SetupStack" component={SetupStackScreen} key="3" /> */}

      <Tab.Screen
        name="InicioStack"
        component={InicioStackScreen}
        listeners={{
          tabPress: (e) => {
            setIsTabVisible(true);
          },
        }}
        options={{
          tabBarLabel: xtextHome,
          // tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <View style={styles.tab}>
              <AntDesign name="home" size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CuboStack"
        component={CuboStackScreen}
        // sceneContainerStyle={{position:'absolute'}}
        options={{
          // unmountOnBlur: true,
        
          tabBarLabel: "Cubo",
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              // style={styles.forgotButton}
              onPress={() => {
                navigation.navigate("CuboStack");
              }}
              style={{
                position: "absolute",
                zIndex: 999999,
                flex: 1,
                bottom:2, // space from bottombar
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
                // elevation: 10,
              }}
            >
              <Ionicons name="ios-cube" size={50} color={color} />
            </TouchableOpacity>
          ),
        }}
        listeners={{
          tabPress: (e) => {},
        }}
      />

      <Tab.Screen
        name="SetupStack"
        component={SetupStackScreen}
        options={{
          tabBarLabel: xtextConfigurar,
          tabBarIcon: ({ color }) => (
            <View style={styles.tab}>
              <MaterialCommunityIcons
                name="account-settings"
                size={24}
                color={color}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {},
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  ////////////////////////////
  //#region ERROR Solution: Setting a timer for a long period of time, i.e. multiple minutes,
  const _setTimeout = global.setTimeout;
  const _clearTimeout = global.clearTimeout;
  const MAX_TIMER_DURATION_MS = 60 * 1000;
  if (Platform.OS === "android") {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return;
          }
          delete timerFix[id];
          fn(...args);
        });
        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = "_lt_" + Object.keys(timerFix).length;
        runTask(id, fn, ttl, args);
        return id;
      }
      return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
      if (typeof id === "string" && id.startsWith("_lt_")) {
        _clearTimeout(timerFix[id]);
        delete timerFix[id];
        return;
      }
      _clearTimeout(id);
    };
  }
  //#endregion

  useKeepAwake(); //Hook para permanecer activo siempre

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Origen"
        component={TabStack} //TabStack
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// function CustomTabBar({ state, descriptors, navigation, position }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         height: 40,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         const inputRange = state.routes.map((_, i) => i);

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityStates={isFocused ? ["selected"] : []}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//           >
//             {route.name === "CuboStack" ? (
//               <Image key={route.name +1}
//                 style={styles.logo}
//                 source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
//               />
//             ) : (
//               <Image key={route.name+2}
//                 style={styles.logo_tiny}
//                 source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
//               />
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 10,
    flexDirection: "row",
    zIndex: 2,
    position: "absolute",
    height: 60,
    flex: 0,
  },

  logo: {
    width: 80,
    height: 80,
    bottom: 30,
  },
  logo_tiny: {
    width: 30,
    height: 30,
  },
});
