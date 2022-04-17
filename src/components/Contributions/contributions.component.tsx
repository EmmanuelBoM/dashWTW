import * as React from "react"

// Importing ChakraUI Components
import {
	VStack,
	Stack,
	Heading,
	Divider,
	
} from "@chakra-ui/react";

// Importing PropTypes
import { IPropTypes } from './contributions.types';

// CONTRIBUTIONS COMPONENT-----------------------------
function Contributions(props: IPropTypes): JSX.Element {
	return(
		<Stack 
		p={5}
		w={320}
		h={494}
		bg="white"
		borderRadius="lg"
		spacing={5}
		justifyContent="space-around"
		>
			<VStack marginBottom={4} alignItems="flex-start" p={2}>
				<Heading  color="black" size="lg">Contributions</Heading>
			</VStack>

			<VStack  w="full" alignItems="center" color="#2F6FE4" >
				<Heading textAlign="center" size="md">Total Contributions</Heading>
				<Heading size="lg" color="black">40</Heading>	
			</VStack>

			<Divider style={{ background: 'gray' }}  />

			<VStack  w="full" alignItems="center" color="#2F6FE4" >
				<Heading textAlign="center" size="md">WTW Listed<br></br> Contributions</Heading>
				<Heading size="lg" color="black">13</Heading>	
			</VStack>

			<Divider style={{ background: 'gray' }}  />

			<VStack w="full" textAlign="center" color="#2F6FE4" >
				<Heading size="md">Contributions <br></br>In Progress</Heading>
				<Heading size="lg" color="black">2</Heading>			
			</VStack>

		</Stack>
	)
}

export default Contributions;