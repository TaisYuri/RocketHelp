import React, { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
 
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  

  const { colors } = useTheme();
  console.log(email)
  return (
    <VStack bg="gray.600" alignItems="center" flex={1} px={8} pt={24}>
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
        onChangeText={ (text) => setEmail(text)}
      />
      <Input
        mb={8}
        placeholder="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={ (pass) => setPassword(pass)}
      />
      <Button title="Entrar" w="full" />
      
    </VStack>
  );
}
