import { Center, Spinner } from "native-base";
import React from "react";

export function Loading() {
  return (
    <Center flex={1} bg='gray.700'>
      <Spinner color='green.700' size={40}/>
    </Center>
  );
}
