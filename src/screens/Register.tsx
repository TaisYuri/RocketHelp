import { useTheme, VStack } from "native-base";
import React from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const { colors } = useTheme();

  return (
    <VStack bg={colors.gray[600]} flex={1} p={6}>
      <Header title="Solicitação" />
      <Input
        placeholder="Número do patrimônio"
        mt={4}
      />
      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
      />
      <Button title="Cadastrar" mt={5}/>
    </VStack>
  );
}
