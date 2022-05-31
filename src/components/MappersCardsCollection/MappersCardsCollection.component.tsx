import React from 'react';
import { useState, useEffect } from 'react';

// Imports axios
import axios from "axios"

// Imports from Chakra UI
import {
  HStack, Stack
} from "@chakra-ui/react"


import Error404 from '../../pages/Error404/Error404.page';
import WheelChairLoading from '../../assets//wheelchairLoading.svg';
import MapperCart from '../mapperCart/mapperCart.component';

export const MappersCardsCollection = (props:any) => {

    const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
    const [ mappers, setMappers ] = useState<any>(null);

    useEffect(()=>{
        setStatus('loading')
        props.setSelectedWindow('mappers')
        axios.get(`http://localhost:9000/mappers/overview?maps=${props.filterCompletionSelection}&order=${props.filterOrderSelection}`) // Devuelve lista de mappers
            .then((result)=>{
              setMappers(result.data)
              setStatus('resolved')
            })
            .catch((error)=>{
              setError(error)
              setStatus('error')
            })
      }, [props.filterOrderSelection, props.filterCompletionSelection])
      
      if (status === "loading") {
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
    
      if (status === "error") {
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
            <HStack
                w="full"
                flexWrap="wrap"
                justifyContent="space-around"
                alignItems="start"
            >
                {mappers.map((mapperInfo:any) => (
                <MapperCart mapper={mapperInfo}></MapperCart>
                ))}
            </HStack>
        )
}
}

export default MappersCardsCollection;