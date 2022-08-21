import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { Header } from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { OrderProps } from "../components/Order";
import { dateFormat } from "../utils/firestoreDateFormat";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { Loading } from "../components/Loading";
import {
  Hourglass,
  CircleWavyCheck,
  DesktopTower,
  ClipboardText,
} from "phosphor-react-native";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  descriptions: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [orders, setOrders] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar a solicitação"
      );
    }

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Solicitação", "Não foi possivel encerrar a solicitação");
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          descriptions,
          status,
          create_at,
          closed_at,
          solution,
        } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrders({
          id: doc.id,
          patrimony,
          descriptions,
          status,
          solution,
          when: dateFormat(create_at),
          closed,
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={5} bg='gray.600'>

      <Header title="Solicitações" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {orders.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          color={
            orders.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {orders.status === "closed" ? "Finalizado" : "Em andamento"}
        </Text>
      </HStack>
      <ScrollView mx={5} showsHorizontalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          descriptions={`Patrimonio ${orders.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="descrição do problema"
          descriptions={`${orders.descriptions}`}
          icon={ClipboardText}
          footer={`Registrado em ${orders.when}`}
        />
        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          footer={orders.closed && `encerrado em ${orders.closed}`}
          descriptions={orders.solution}
        >
          {orders.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              multiline
              h={24}
              textAlignVertical="top"
            />
          )}
        </CardDetails>
      </ScrollView>
      {orders.status === "open" && (
        <Button title="Encerrar solicitação" onPress={handleOrderClose} m={5} />
      )}
    </VStack>
  );
}
