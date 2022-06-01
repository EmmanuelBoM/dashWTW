import React from 'react';
import { useState, useEffect } from 'react';

// Imports axios
import axios from "axios"

// Imports from Chakra UI
import {
    Box,
    CircularProgress,
    CircularProgressLabel,
    Grid,
    GridItem,
    Heading,
    HStack, 
    Stack, 
    VStack,
    Text
} from "@chakra-ui/react"


import Error404 from '../../pages/Error404/Error404.page';
import WheelChairLoading from '../../assets//wheelchairLoading.svg';

// Imports of icons from wtw icons
import BuildingEntrance from 'wtw-icons/_icons/Buildingentrance'
import Lobby from 'wtw-icons/_icons/Lobby'
import FoodService from 'wtw-icons/_icons/FoodService'
import SwimmingPool from 'wtw-icons/_icons/SwimmingPool'
import QueenBed from 'wtw-icons/_icons/QueenBed'
import GeneralAttribute from 'wtw-icons/_icons/GeneralAttribute'
import Bathroom from 'wtw-icons/_icons/Bathroom'
import Elevator from 'wtw-icons/_icons/Elevator'
import Gym from 'wtw-icons/_icons/Gym'
import Beachfront from 'wtw-icons/_icons/Beachfront'
import Parking from 'wtw-icons/_icons/Parking'
import Other from 'wtw-icons/_icons/Other'

// Arrays of existing areas into the AMS
let areasAMS:any[] = [["Building Entrance", <BuildingEntrance width="1.6em" height="1.6em"/>, "building_entrance", 0],
                      ["Lobby Reception", <Lobby width="1.6em" height="1.6em"/>, "lobby", 0],
                      ["Rooms", <QueenBed width="1.6em" height="1.6em"/>, "rooms", 0],
                      ["Room One", <QueenBed width="1.6em" height="1.6em"/>, "roomone", 0],
                      ["Room Two", <QueenBed width="1.6em" height="1.6em"/>, "roomtwo", 0],
                      ["Room Three", <QueenBed width="1.6em" height="1.6em"/>, "roomthree", 0],
                      ["General Accessibility", <GeneralAttribute width="1.6em" height="1.6em"/>, "general_attributes", 0],
                      ["Food Service Area", <FoodService width="1.6em" height="1.6em"/>, "foodservicearea", 0],
                      ["Swimming Pool", <SwimmingPool width="1.6em" height="1.6em"/>, "swimmingpool", 0],
                      ["Fitness Center", <Gym width="1.6em" height="1.6em"/>, "fitnesscenter", 0],
                      ["Beachfront", <Beachfront width="1.6em" height="1.6em"/>, "beachfront", 0],
                      ["Parking Area", <Parking width="1.6em" height="1.6em"/>, "parkingarea", 0],
                      ["Common Area Toilet", <Bathroom width="1.6em" height="1.6em"/>, "commonareatoilet", 0],
                      ["Other Areas", <Other width="1.6em" height="1.6em"/>, "otherareas", 0],
                      ["Elevator", <Elevator width="1.6em" height="1.6em"/>, "elevator", 0]]  

export const AreasProgressCardsCollection = (props:any) => {

    const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
    const [ areas, setAreas ] = useState<any>("");
    let percentageToAssign:number = 0

    useEffect(()=>{
        setStatus('loading')
        axios.get(`https://apidash2.herokuapp.com/maps/detail/${props.accomodationId}`) 
            .then((result)=>{
                setAreas(areasAMS.filter( (area) => { 
                    for(let i = 0; i < result.data.progressAreas.length; i++) { 
                        if (area[2].includes(result.data.progressAreas[i].name)) {
                            area[3] = result.data.progressAreas[i].process
                            percentageToAssign = percentageToAssign + (parseInt(result.data.progressAreas[i].process)*0.25)
                            return true
                        } 
                    }
                }
            ))
                props.setTotalPercentage(percentageToAssign)
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
                            <Box color="black.800" display='inline-flex' justifyContent='space-around' alignItems='baseline' width='max-content'>
                                <span>
                                {item[1]}
                                </span>
                                <Heading
                                    fontSize="xl"
                                    color="black.main"
                                    fontWeight="bold"
                                    marginTop="1vw"
                                    marginBottom="2vw"
                                    marginLeft='1em'
                                    >
                                    {item[0]}
                                </Heading>
                            </Box>
                            <CircularProgress
                            value={item[3]}
                            size="120px"
                            >
                            <CircularProgressLabel
                                color="#2F6FE4"
                                fontSize="lg"
                                fontWeight="bolder"
                            >
                                {item[3]}%
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