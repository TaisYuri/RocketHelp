import { Box, HStack, Icon, Text, useTheme, VStack } from 'native-base';
import {IconProps} from 'phosphor-react-native';
import { ReactNode } from 'react';

type Props ={
    title: string;
    descriptions?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({descriptions,footer,icon: Icon,title,children}:Props){
    const {colors} = useTheme();

    return(
        <VStack bg="gray.600" p={5} mt={5} rounded='sm'>
            <HStack alignItems='center' mb={4}>
                <Icon color={colors.primary[700]}/>
                <Text textTransform='uppercase' color="gray.300" ml={2} fontSize='sm'>{title}</Text>
            </HStack>
            {!!descriptions && 
                <Text color='gray.100' fontSize='md'>{descriptions}</Text>
            }
            { children }
            {!!footer && 
                <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
                    <Text mt={3} color='gray.300' fontSize='sm'>{footer}</Text>
                </Box>
            }
            
        </VStack>
    )
}