import { HStack, Icon, Text, VStack } from 'native-base';
import {IconProps} from 'phosphor-react-native';
import { ReactNode } from 'react';

type Props ={
    title: string;
    descriptions: string;
    footer: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({descriptions,footer,icon,title,children}:Props){
    return(
        <VStack>
            <HStack>
                <Text>ICON</Text>
                <Text textTransform='uppercase'>{title}</Text>
            </HStack>
        </VStack>
    )
}