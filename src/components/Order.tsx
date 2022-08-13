import {
  Button as ButtonNativeBase,
  Text,
  Heading,
  HStack,
  Box,
  useTheme,
  VStack,
  Icon,
  Circle,
  Pressable,
  IPressableProps,
} from "native-base";
import React from "react";
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from "phosphor-react-native";

export type OrderProps = {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
};

type Props = IPressableProps &{
  data: OrderProps;
};

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();
  const statusColor =
    data.status === "open" ? colors.secondary[700] : colors.green[300];

  return (
    //Pressable: torna clicavel o componente
    <Pressable {...rest}> 
      <HStack
        // bg={"gray.600"}
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            {data.patrimony}
          </Text>
          <HStack alignItems="center">
            <ClockAfternoon color={colors.gray[300]} size={15} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {data.status === "closed" ? (
            <CircleWavyCheck color={statusColor} size={24} />
          ) : (
            <Hourglass color={statusColor} size={24} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}