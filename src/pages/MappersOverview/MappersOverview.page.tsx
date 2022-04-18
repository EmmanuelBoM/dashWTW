import * as React from "react"
import {
  Container,
  Flex,
  Image,
  Heading,
  Box,
  Text,
  AspectRatio,
  Wrap,
  VStack,
  HStack,
  Select,
  Grid,
  GridItem,
  StackDivider,
  Icon,
  createIcon,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react"


import  MenuComponent  from '../../components/Menu/menu.component';

import './MappersOverview.modules.css'

import MapperCart from "../../components/mapperCart";
import { Search2Icon } from "@chakra-ui/icons";
import FilternSort from "../../components/FilternSort";

let window:string = "mappers"
let username:string = "Arturo Gaona"
let mappers = [
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
]

export const MappersOverview = () => (
    <Container maxWidth="container.xxl" bgColor="#F8F9FD">
        <MenuComponent window={window}/>
        <Flex  p='7% 20% 5% 15%' marginLeft="3vw" direction={{ base: "column", md: "row" }}>
            <VStack spacing={20}>
                <HStack w='70vw' justifyContent='space-between' alignItems="end">
                    <VStack alignItems='flex-start'>
                        <Box>
                            <Heading fontSize='1.5em' color='blue.600'>Welcome, {username}</Heading>
                        </Box>
                        <Heading size="xl">Mappers Overview</Heading>
                    </VStack>
                    <HStack alignItems='center' w='35vw' justifyContent="space-around">
                        <InputGroup marginRight="1rem">
                            <InputLeftElement
                                pointerEvents='none'
                                children={<Search2Icon color='gray.300' />}
                                />
                            <Input placeholder="Search by: Name" borderColor="lightgray.main" borderRadius="lg"></Input>
                        </InputGroup>
                        <FilternSort></FilternSort>
                        
                    </HStack>
                </HStack>
                
                <HStack w="full" flexWrap="wrap" justifyContent="space-around" alignItems="start">
                    {mappers.map((mapperInfo, i)=>(
                        <MapperCart mapper={mapperInfo}></MapperCart>)
                    )}
                </HStack>
                
                
                

            </VStack>
        </Flex>
    </Container>
)

export default MappersOverview;