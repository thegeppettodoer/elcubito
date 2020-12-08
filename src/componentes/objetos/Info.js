import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from 'react-native';

const Container = styled.View`
  flex: 1;
  margin-top: 0px;
  margin-bottom: 20px;
  padding-left: 5px;
`;

const Titulo = styled.Text`
  font-size: 20px;
  color: #fff;
  letter-spacing: -0.2px;
  margin-top: 6px;
  width: 80%;
  font-weight: bold;
  font-family: 'LatoItalic';

`;
const Description = styled.Text`
  font-size: 17px;
  color: #fff;
  letter-spacing: -0.2px;
  margin-top: 6px;
  width: 80%;
  font-family: 'LatoItalic';

`;
 

const Info = ({ data }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
    <ScrollView>

    <Container key={data.id} collapsable={false} >
   
      <Titulo>{data.titulo}</Titulo>

      <Description>{data.descripcion}</Description>
 
    </Container>
    </ScrollView></SafeAreaView>
  );
};

export default Info;
 