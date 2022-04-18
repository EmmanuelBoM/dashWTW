import React from 'react';
import {
	VStack,
	HStack,
	Heading,
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
				<Heading size="md">Ronald Michards</Heading>
				<Text color="#C4C4C4" >Vancouver, CA</Text>
			</VStack>
			<VStack spacing={0}>
				<Text fontWeight="bold" >Last Sign In</Text>
				<Text>Aug 30, 2023</Text>
				<Text color="#C4C4C4" >6:30 pm</Text>
			</VStack>

			<VStack border="1px solid #DFE0EB" borderRadius="5%/10%" w="2363m" h="6.5em">
				<VStack>
					<Text fontWeight="bold" size='md'>Maps</Text>
				</VStack>
				
				<VStack flexDirection="row" alignContent="flex-start">
					<VStack w="7em" h="3em">
						<Text color="#C4C4C4">Done</Text>
						<Text fontWeight="bold" size='md'>1</Text>
					</VStack>
					<VStack  width="37px" height= "0px" backgroundColor="#DFE0EB"  border=" 1px solid #DFE0EB" transform= "rotate(90deg)"></VStack>
					<VStack w="7em" >
						<Text color="#C4C4C4">In progress</Text>
						<Text fontWeight="bold" size='md'>1</Text>
					</VStack>

				</VStack>
			</VStack>

			<VStack >
				<Button marginTop={3.5} backgroundColor="transparent" border=" 1px solid #DFE0EB" color="#2F6FE4" borderRadius="20%/50%" px={6} size='sm'>
				Contact
				</Button>
					
			</VStack>

			

		</VStack>
	);
}

export default MapperCart;