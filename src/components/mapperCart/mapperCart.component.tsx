import React from 'react';
import {
	VStack,
	HStack,
	Heading,
	Text,
	AspectRatio,
	Image,
	Divider,
	Button, ButtonGroup,
} from "@chakra-ui/react";
import { IPropTypes } from './mapperCart.types';

function MapperCart(props: IPropTypes): JSX.Element {
	
	return (
    <VStack
      borderRadius="2xl"
      alignItems="center"
      bg="black.100"
      p={3}
      w="17rem"
      marginBottom="1.5rem !important"
      spacing={2}
      boxShadow="4px 11px 28px rgba(0, 0, 0, 0.08);"
      cursor="pointer"
    >
      <VStack alignItems="center" p={0}>
        <AspectRatio w={20} height={20}>
          <Image
            borderRadius="full"
            src={props.mapper.profileImg}
            alt="cat picture"
          />
        </AspectRatio>
      </VStack>

      <VStack spacing={0}>
        <Text fontWeight="600">{props.mapper.mapperName}</Text>
        <Text
          color="black.400"
          fontSize="sm"
        >{`${props.mapper.mapperCity}, ${props.mapper.mapperCountry}`}</Text>
      </VStack>
      <VStack spacing={0}>
        <Text fontWeight="bold" fontSize="sm">
          Last Sign In
        </Text>
        <Text fontSize="smaller">{props.mapper.lastSignInDate}</Text>
        <Text color="black.400" fontSize="smaller">
          {props.mapper.lastSignInHour}
        </Text>
      </VStack>

      <VStack border="1px solid #DFE0EB" borderRadius="lg" w="15rem" p={3}>
        <VStack>
          <Text fontWeight="bold" size="md">
            Maps
          </Text>
        </VStack>

        <HStack w="80%" justifyContent="space-between" alignItems="center">
          <VStack w="50%" h="3em">
            <Text color="black.400" fontSize="sm">
              Done
            </Text>
            <Text fontWeight="bold" size="md">
              {props.mapper.mapsDone}
            </Text>
          </VStack>
          <VStack
            w="0.15rem"
            h="2.5em"
            borderRadius="full"
            backgroundColor="#DFE0EB"
            border=" 1px solid #DFE0EB"
          ></VStack>
          <VStack w="50%" h="3em">
            <Text color="black.400" fontSize="sm">
              In progress
            </Text>
            <Text fontWeight="bold" size="md">
              {props.mapper.mapsInProgress}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <VStack>
        <Button
          marginTop={3.5}
          border=" 1px solid #DFE0EB"
          color="#2F6FE4"
          fontWeight="700"
          borderRadius="full"
          px={6}
          size="md"
          bg="transparent"
        >
          Contact
        </Button>
      </VStack>
    </VStack>
  );
}

export default MapperCart;