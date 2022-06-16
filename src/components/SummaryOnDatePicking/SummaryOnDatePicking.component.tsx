import React, { EffectCallback } from 'react';
import { useState, useEffect } from 'react';

// Imports axios
import axios, { AxiosResponse } from "axios"

// Imports from Chakra UI
import {
  Heading,
  Box,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react"

import Error404 from '../../pages/Error404/Error404.page';
import ErrorMessage from '../ErrorMessage';

export const SummaryOnDatePicking = (props:any) => {
    const [ mapsOverviewData, setMapsOverviewData ] = useState<any>(null);
    const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);

    useEffect(()=>{
        setStatus('loading')
        axios.get(`http://localhost:9000/maps/overview/${props.calendarStartDate}/${props.calendarEndDate}`) // Devuelve data de mapsOverview
            .then((result)=>{
              setMapsOverviewData(result.data)
              setStatus('resolved')
              
            })
            .catch((error)=>{
              setError(error)
              setStatus('error')
            })
    }, [props.calendarStartDate,
        props.calendarEndDate])

    if (status === "loading") {
        return(
            <h1>Loading...</h1>
        )
    }

    if (status === "error") {
        return (
            <>
			    {error.message === "Request failed with status code 404" ? <ErrorMessage error="No results found :(" type="data"/>  : <ErrorMessage error="Woops! Something went wrong" type="general"/>  }
		    </>
        )
    }

    else {
        return(
        <Box
        p={5}
        shadow="md"
        w="full"
        borderWidth="1px"
        borderColor="black.200"
        borderRadius="lg"
        bgColor="#FFF"
        
        >
        <Heading fontSize="xl">{props.datePickerSelection} Summary</Heading>
        <HStack justifyContent="space-evenly" marginTop={6}>
            <VStack w="8vw">
            <Box display='inline-flex'>
                <Text> 
                <b>Completed </b>
                </Text>  
                <Text paddingLeft='5px'>Maps</Text>
            </Box>
            <Box
                borderWidth="5px"
                borderRadius="lg"
                borderColor="blue.main"
                w="7vw"
                h="7vw"
                textAlign="center"
            >
                <Text fontSize="2em" fontWeight="bold" marginTop="25%">
                {mapsOverviewData.summary.completedMaps}
                </Text>
            </Box>
            </VStack>
            <VStack w="8vw">
            <Box display='inline-flex' width="max-content">
                <Text> 
                <b>In Progress </b>
                </Text>  
                <Text paddingLeft='5px'>Maps</Text>
            </Box>
            <Box
                borderWidth="5px"
                borderRadius="lg"
                borderColor="black.main"
                w="7vw"
                h="7vw"
                textAlign="center"
            >
                <Text fontSize="2em" fontWeight="bold" marginTop="25%">
                {mapsOverviewData.summary.mapsInProgress}
                </Text>
            </Box>
            </VStack>
        </HStack>
        </Box>
        )
    }
}

export default SummaryOnDatePicking;