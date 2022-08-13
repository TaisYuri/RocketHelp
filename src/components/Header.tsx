import React from "react";
import {
  Button,
  HStack,
  IButtonProps,
  IconButton,
  Heading,
  useTheme,
  StyledProps,
} from "native-base";

import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }
  return (
    <HStack
      w="full"
      pb={6}
      justifyContent="space-between"
      alignItems={"center"}
      bg="gray.600"
      pt={12}
      {...rest}
    >
      <IconButton icon={<CaretLeft size={24} color={colors.gray[200]} />} onPress={handleGoBack} />
      <Heading
        color="gray.100"
        textAlign={"center"}
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
