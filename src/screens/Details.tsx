import { useRoute } from "@react-navigation/native";
import { HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { Header } from "../components/Header";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { OrderProps } from "../components/Order";
import { dateFormat } from "../utils/firestoreDateFormat";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { Loading } from "../components/Loading";
import { Hourglass, CircleWavyCheck } from "phosphor-react-native";

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

  const route = useRoute();
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();

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
      <Header title="Solicitações" />
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
          { orders.status === "closed" ? 'Finalizado' : 'Em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsHorizontalScrollIndicator={false}>

      </ScrollView>
    </VStack>
  );
}
