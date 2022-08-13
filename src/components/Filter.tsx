import React from "react";
import { Button, IButtonProps, Text, useTheme } from "native-base";

type props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: "open" | "closed";
};

export function Filter({ title, isActive = false, type, ...rest }: props) {
  const { colors } = useTheme();
  const colorTypes =
    type === "open" ? colors.secondary[700] : colors.green[300];
  return (
    <Button
      variant="outline"
      flex={1}
      borderColor={colorTypes}
      borderWidth={isActive ? 1 : 0}
      // bg="gray.600"
      {...rest}
    >
      <Text
        color={isActive ? colorTypes : "gray.300"}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}
