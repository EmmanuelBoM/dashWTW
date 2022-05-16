import * as React from "react"
import { useState, useEffect } from "react"
import { useLocalStorage } from "../../useLocalStorage";

// Imports axios
import axios from "axios"

//Imports chakra ui Components
import {
  Container,
  Flex,
  Heading,
  Box,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons";

//Imports stylesheet
import './MappersOverview.modules.css'

//Imports custom Components
import MapperCart from "../../components/mapperCart";
import FilternSort from "../../components/FilternSort";
import { setTextRange } from "typescript";
import Error404 from "../Error404"

//Variables used
let username:string = "Arturo Gaona"
/*let mapperss = [
    {
        mapperName: "Tom Cruise",
        mapperCity: "Viña del mar",
        mapperCountry: "CL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 4, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/men/88.jpg"
    },
    {
        mapperName: "Devon Lane",
        mapperCity: "London",
        mapperCountry: "UK",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 3, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        mapperName: "Bessie Cooper",
        mapperCity: "Bogota",
        mapperCountry: "COL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 1, 
        mapsInProgress: 1,
        profileImg: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
        mapperName: "Tom Cruise",
        mapperCity: "Viña del mar",
        mapperCountry: "CL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 4, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/men/88.jpg"
    },
    {
        mapperName: "Devon Lane",
        mapperCity: "London",
        mapperCountry: "UK",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 3, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        mapperName: "Bessie Cooper",
        mapperCity: "Bogota",
        mapperCountry: "COL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 1, 
        mapsInProgress: 1,
        profileImg: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
        mapperName: "Tom Cruise",
        mapperCity: "Viña del mar",
        mapperCountry: "CL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 4, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/men/88.jpg"
    },
    {
        mapperName: "Devon Lane",
        mapperCity: "London",
        mapperCountry: "UK",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 3, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        mapperName: "Bessie Cooper",
        mapperCity: "Bogota",
        mapperCountry: "COL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 1, 
        mapsInProgress: 1,
        profileImg: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
        mapperName: "Tom Cruise",
        mapperCity: "Viña del mar",
        mapperCountry: "CL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 4, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/men/88.jpg"
    },
    {
        mapperName: "Devon Lane",
        mapperCity: "London",
        mapperCountry: "UK",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 3, 
        mapsInProgress: 2,
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
        mapperName: "Bessie Cooper",
        mapperCity: "Bogota",
        mapperCountry: "COL",
        lastSignInDate: "May 26, 2019",
        lastSignInHour: "6:30 PM",
        mapsDone: 1, 
        mapsInProgress: 1,
        profileImg: "https://randomuser.me/api/portraits/women/60.jpg"
    }
]*/

export const MappersOverview = () => {
  
  const[contenido,setContenido]= useLocalStorage('text','');
  const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
  const [ mappers, setMappers ] = useState<any>(null);

  useEffect(()=>{
    setStatus('loading')
    axios.get(`http://localhost:9000/mappers/overview`) // Devuelve lista de mappers
        .then((result)=>{
          setMappers(result.data)
          setStatus('resolved')
        })
        .catch((error)=>{
          setError(error)
          setStatus('error')
        })
    }, [])
  
  if (status === "loading") {
    return(
      <h1>Loading...</h1>
    )
  }

  if (status === "error") {
    return (
			<Error404/>
		)
  }

  else {
    return(
      <Container maxWidth="container.xxl" bgColor="#F8F9FD">
        <Flex
          p="7% 20% 5% 15%"
          marginLeft="3vw"
          direction={{ base: "column", md: "row" }}
        >
          <VStack spacing={20}>
            <HStack w="70vw" justifyContent="space-between" alignItems="end">
              <VStack alignItems="flex-start">
                <Box>
                  <Heading fontSize="1.5em" color="blue.600">
                    Welcome, {username}
                  </Heading>
                </Box>
                <Heading size="xl">Mappers Overview</Heading>
              </VStack>
              <HStack alignItems="center" w="35vw" justifyContent="space-around">
                <InputGroup marginRight="1rem">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                  />
                  <Input
                    onChange={(e:any) => (setContenido(e.target.value))}
                    value={contenido}
                    placeholder="Search by: Name"
                    borderColor="lightgray.main"
                    borderRadius="lg"
                  ></Input>
                </InputGroup>
                <FilternSort></FilternSort>
              </HStack>
            </HStack>
  
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
          </VStack>
        </Flex>
      </Container>
    )
  }
};

export default MappersOverview;