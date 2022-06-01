import React from 'react';
import { useState, useEffect } from 'react';

// Imports axios
import axios from "axios"

// Imports from Chakra UI
import {
    CircularProgress,
    CircularProgressLabel,
    Grid,
    GridItem,
    Heading,
    HStack, 
    Stack, 
    VStack
} from "@chakra-ui/react"


import Error404 from '../../pages/Error404/Error404.page';
import WheelChairLoading from '../../assets//wheelchairLoading.svg';

export const AreasProgressCardsCollection = (props:any) => {

    const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
    const [ areas, setAreas ] = useState<any>("");

    useEffect(()=>{
        setStatus('loading')
        axios.get(`http://localhost:9000/maps/detail/${props.accomodationId}`) 
            .then((result)=>{
              setAreas(result.data.progressAreas)
              setStatus('resolved')
            })
            .catch((error)=>{
              setError(error)
              setStatus('error')
            })
        }, [props.toggleCompleted])
        
        if (status === "loading" || areas === "") {
            return(
                <Stack
                    w="full"
                    h="60vh"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <img src={WheelChairLoading} height='auto' width='70vh' alt='Loading...'/>
                </Stack>
            )
        }
        
        else if (status === "error") {
            return (
                <HStack
                    w="full"
                    flexWrap="wrap"
                    justifyContent="space-around"
                    alignItems="start"
                >
                    <Error404/>
                </HStack>
                
            )
        }
        
        else {
            return(
                <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                    {areas.map((item:any) => (
                        <GridItem>
                        <VStack
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            bgColor="#FFF"
                            w="22vw"
                            borderRadius="lg"
                        >
                            <Heading
                            fontSize="xl"
                            color="black.main"
                            fontWeight="bold"
                            marginTop="1vw"
                            marginBottom="2vw"
                            >
                            {item.name}
                            </Heading>
                            <CircularProgress
                            value={item.percentage}
                            size="120px"
                            >
                            <CircularProgressLabel
                                color="#2F6FE4"
                                fontSize="lg"
                                fontWeight="bolder"
                            >
                                {item.percentage}%
                            </CircularProgressLabel>
                            </CircularProgress>
                        </VStack>
                        </GridItem>
                    )
                )}
            </Grid>
        )
    }
}

export default AreasProgressCardsCollection;