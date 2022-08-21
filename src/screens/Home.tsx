import React, { useEffect, useState } from "react";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Heading,
  Text,
  FlatList,
  Center,
} from "native-base";
import { ChatTeardropText} from 'phosphor-react-native'
import { SignOut } from "phosphor-react-native";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import {useNavigation} from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore'; 
import { dateFormat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<"open" | "closed">("open");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect( ()=> {
    setIsLoading(true);

    const subscriber = firestore()
    .collection('orders')
    .where('status', '==', selected)  // busca status == status(state)
    .onSnapshot( snapshot => {   //atualiza em tempo real
      const data = snapshot.docs.map( doc => {
          const {patrimony, descriptions, status, create_at} = doc.data();

          return{
            id: doc.id,
            patrimony,
            descriptions,
            status,
            when: dateFormat(create_at)
          }
      })
      setOrders(data);
      setIsLoading(false);
    })  
    
    return subscriber;
  },[selected])

  function handleNewOrder(){
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string){
    navigation.navigate('details', { orderId})
  }

  function handleLogOut(){
    auth().signOut()
    .catch( (error) => {
      console.log(error);
      Alert.alert('Sair', 'Não foi possivel sair');
    })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={12}
        pb={5}
        px={6}
        bg="gray.600"
      >
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray["300"]} />} onPress={handleLogOut}/>
      </HStack>

      <VStack flex={1} px={6} mt={6}>
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          space={3}
        >
          <Filter
            title="Em aberto"
            type="open"
            onPress={() => setSelected("open")}
            isActive={selected === "open"}
          />
          <Filter
            title="Fechado"
            type="closed"
            onPress={() => setSelected("closed")}
            isActive={selected === "closed"}
          />
        </HStack>

    {isLoading 
    ? <Loading/> 
    : <FlatList
          data={orders}
          renderItem={({ item }) => <Order data={item} onPress={() =>handleOpenDetails(item.id)}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70}}
          ListEmptyComponent={() =>
            <Center mt={6}>
              <ChatTeardropText color={colors.gray[300]}/>
              <Text color="gray.300" fontSize='xl' mt={6} alignItems="center">
                Você ainda não possui {'\n'} 
                solicitações {selected === 'open' ? 'em andamento': 'finalizados'}
              </Text>
            </Center>
          }
        />
      }
        <Button title="Nova solicitação" onPress={handleNewOrder}/>
      </VStack>
    </VStack>
  );
}
