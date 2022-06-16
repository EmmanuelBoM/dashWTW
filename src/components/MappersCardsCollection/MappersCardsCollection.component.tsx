import React from 'react';
import { useState, useEffect } from 'react';

// Imports axios
import axios from "axios"

// Imports from Chakra UI
import {
  HStack, 
  Stack
} from "@chakra-ui/react"


import Error404 from '../../pages/Error404/Error404.page';
import WheelChairLoading from '../../assets//wheelchairLoading.svg';
import MapperCart from '../mapperCart/mapperCart.component';
import ErrorMessage from '../ErrorMessage';

export const MappersCardsCollection = (props:any) => {

  const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
  const [ mappers, setMappers ] = useState<any>(null);

  useEffect(()=>{
      setStatus('loading')
      props.setSelectedWindow('mappers')
      if (props.searchQuery.length > 0) {
          axios.get(`https://apidash2.herokuapp.com/mappers/overview?nombre=${props.searchQuery}`) // Devuelve lista de mappers
          .then((result)=>{
            setMappers(result.data)
            setStatus('resolved')
            console.log(mappers)
          })
          .catch((error)=>{
            setError(error)
            setStatus('error')
          })
      } else {
      axios.get(`https://apidash2.herokuapp.com/mappers/overview?maps=${props.filterCompletionSelection}&order=${props.filterOrderSelection}&page=1`) // Devuelve lista de mappers
          .then((result)=>{
            setMappers(result.data)
            setStatus('resolved')
          })
          .catch((error)=>{
            setError(error)
            setStatus('error')
          })
      }
    }, [props.filterOrderSelection, props.filterCompletionSelection, props.searchQuery])
    
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
  
    if (status === "error"  ) {
      return (
        <>
        {error.message === "Request failed with status code 404" ?  <ErrorMessage type="data" error="No results found :("/>  : <ErrorMessage error="Woops! Something went wrong" type="general"/>  }
      </>
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