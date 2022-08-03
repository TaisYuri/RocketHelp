import React from "react";
import { HStack, IconButton } from "native-base";

import {SignOut } from 'phosphor-react-native'

export function Header() {
  return (
    <HStack>
        {/* <Logo /> */}
        <IconButton icon={<SignOut/>} />
    </HStack>
  );
}
