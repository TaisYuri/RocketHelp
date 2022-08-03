import { HStack, IconButton, VStack, useTheme, Heading, Text } from "native-base";
import { SignOut } from "phosphor-react-native";
import React, { useState } from "react";
import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";

export function Home() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<'open' | 'closed'>('open')
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
        <IconButton icon={<SignOut size={26} color={colors.gray['300']}/>} />
      </HStack>

      <VStack flex={1} px={6} mt={6}>
        <HStack  w="full" justifyContent="space-between" alignItems="center" mb={4}>
            <Heading color='gray.100'>Meus chamados</Heading>
            <Text color='gray.200'>3</Text>
        </HStack>
        <HStack w="full" justifyContent="space-between" alignItems="center" mb={4}>
            <Filter title='Em aberto' type="open" onPress={() =>setSelected('open')} isActive={selected === 'open'}/>
            <Filter title='Fechado' type="closed" onPress={() =>setSelected('closed')} isActive={selected === 'closed'}/>
        </HStack>
      </VStack>
    </VStack>
  );
}