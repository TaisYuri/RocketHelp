import React, { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  function handleSignIn(){
    if(!email || !password){
      return Alert.alert("Entrar","Email ou senha não informados")
    }
    setIsLoading(true)

    auth().signInWithEmailAndPassword(email, password)
    .then((response ) => {
      
    })
    .catch( (error) =>{
      console.log(error);
      setIsLoading(false)

      if(error.code === 'auth/invalid-email'){
        return Alert.alert('Entrar', 'Email inválido');
      }

      if(error.code === 'auth/wrong-password'){
        return Alert.alert('Entrar', 'Senha inválido');
      }

      if(error.code === 'auth/user-not-found'){
        return Alert.alert('Entrar', 'usuário não cadastrado');
      }

      return Alert.alert('Entrar', 'Não foi possivel acessar');
    })
  }

  return (
    <VStack
      bg="gray.600"
      alignItems="center"
      flex={1}
      px={8}
      pt={24}
    >
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="email"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        mb={8}
        placeholder="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={(pass) => setPassword(pass)}
      />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} w="full" />
    </VStack>
  );
}
