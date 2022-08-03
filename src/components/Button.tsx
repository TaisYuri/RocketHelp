import { Button as ButtonNativeBase, IButtonProps, Heading} from "native-base";
import React from "react";

type IButton = IButtonProps & {
    title: string;
}


export function Button({title, ...props}: IButton) {
  return (
    <ButtonNativeBase 
        bg='green.700' 
        h={14}
        fontSize='sm'
        rounded='sm'
        _pressed={{
            bg:'green.500'
        }}
        {...props}>
      <Heading color='white' fontSize='sm'>{title}</Heading>
    </ButtonNativeBase>
  );
}
