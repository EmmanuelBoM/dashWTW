import React from 'react';
import {
	VStack,
	HStack,
	Text,
	AspectRatio,
	Image,
	Divider,
	Button, ButtonGroup, color,

} from "@chakra-ui/react";
import { IPropTypes } from './mapperCart.types';

function MapperCart(props: IPropTypes): JSX.Element {
	
	return (

		<VStack
			borderRadius="xl"
			h="26em"
			w="17.5em"//rems /16
			//p={10}
			//spacing={10}
			alignItems="center"
			bg="gray.50"
			spacing={2}	
			_hover={{ backgroundColor: '#3E5A8C',color:'white' }}

		>
			<VStack alignItems="center" p={0} >
				<AspectRatio  w={24} height={24}>
						<Image marginTop="12%" borderRadius="full" src="http://purepng.com/public/uploads/large/purepng.com-sitting-catcatcatsanimalspetscute-cat-25152016380020k8o.png" alt="cat picture" />
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


export default MapperCart;