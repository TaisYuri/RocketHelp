import { useTheme, VStack } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'

export function Register() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [descriptions, setDescriptions] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !descriptions){
      return Alert.alert('Preencha todos os campos');
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      descriptions,
      status: 'open',
      create_at: firestore.FieldValue.serverTimestamp()
    })
    .then( ()=> {
      Alert.alert('Solicitação', 'Solicitação registrada com Sucesso');
      navigation.goBack();
    })
    .catch( (error)=>{
      console.log(error);
      setIsLoading(false);
      Alert.alert('Solicitação', 'não foi possivel registrar a solicitação')
    })
  }

  return (
    <VStack bg={colors.gray[600]} flex={1} p={6}>
      <Header title="Solicitação" />
      <Input
        placeholder="Número do patrimônio"
        value={patrimony}
        onChangeText={setPatrimony}
        mt={4}
      />
      <Input
        placeholder="Descrição do problema"
        value={descriptions}
        onChangeText={setDescriptions}
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
      />
      <Button title="Cadastrar" onPress={handleNewOrderRegister} isLoading={isLoading} mt={5}/>
    </VStack>
  );
}
