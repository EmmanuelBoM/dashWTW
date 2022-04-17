
import React from 'react'
import { IPropTypes } from './mapProgressbar.types';
import {Box, Text, Container, HStack } from '@chakra-ui/react';



function MapProgressBar(props: IPropTypes): JSX.Element {
	let bgColor:string="#000";

	if(props.progress<=20){
		bgColor="#EE5B5B"
	}
	else if (props.progress<=50){
		bgColor="#FF9162"
	}
	else if(props.progress<=70){
		bgColor="#FFD362"
	}

	else if(props.progress<=99){
		bgColor="#FFF962"
	}

	else{
		bgColor="#6FFF62"
	}

	return (
		<HStack w="80%" borderRadius="full" position='relative'background="black.300" h={props.showProgress? "2.5rem" : "1.5rem"} justifyContent="left">
			<Box w={`${props.progress}%`} borderRadius="full" background="#FFF962" h={props.showProgress? "2.5rem" : "1.5rem"} >
			</Box>
			{props.showProgress ? <Text textAlign="center" position='absolute' width='100%' fontWeight="black">{`${props.progress}%`}</Text> : null }
		</HStack>
	)
}

export default MapProgressBar