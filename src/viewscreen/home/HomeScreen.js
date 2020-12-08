import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import FormButton from '../components/FormButton';
import { AuthContext } from '../../componentes/navigation/AuthProvider';
import MisWf from "./MisWf";

const HomeScreen = ({navigation}) => {
    const {user, logout} = useContext(AuthContext);

  return (
    <View key="c1" style={styles.container}>
       <MisWf navigation={navigation} />
    </View>
  );
};
 
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#000",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0, 
  },
});