import * as React from "react"
import { useEffect, useState } from "react";

// Importing axios
import axios from "axios";

// Importing PropTypes
import { IPropTypes } from './MapDetails.types';

// Importing Chakra UI Components
import {
  Container,
  Flex,
  Grid,
  GridItem,
  VStack,
  Heading,
  HStack,
  Box,
  Text,
  Image,
  Divider,
  Switch,
  Button,
  Stack
} from "@chakra-ui/react"

// Importing the react-router-dom function that allows navigation
import { useNavigate, useParams } from "react-router-dom";

// Importing custom components
import MapProgressbar from "../../components/MapProgressbar";

// Importing images
import Hotel from 'wtw-icons/_icons/Hotel'; // Importing wtw icons
import Location from 'wtw-icons/_icons/Location'; // Importing wtw icons

// Importing icons from react-icons
import { RiArrowGoBackLine } from "react-icons/ri";
import Error404 from "../Error404";
import WheelChairLoading from '../../assets//wheelchairLoading.svg';
import AreasProgressCardsCollection from "../../components/AreasProgressCardsCollection/AreasProgressCardsCollection.component";

// Vars that contain the main info of the view
let category:string = "Place To Stay"

// These vars contain the statuses of completion of all maps
let progressCompletionMaps:string[] = ["In progress", "Completed", "Not started"]
let colorsProgressCompletionMaps:string[] = ["#FFB800", "green", "red"]

// enum of Typescript for storing the months of the year
enum MonthsOfTheYear {
  "Jan" = 1,
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
}

// MAP DETAILS VIEW---------------------------------------------------------------------
function MapDetails(props: IPropTypes): JSX.Element {
  
  // Function that allows navigation (react-router-dom)
  let navigate = useNavigate()

  // Storing params
  let params = useParams();
  let { accomodationId } = params;

  // States
  const [ status, setStatus ] = useState<string>('');
  const [ error, setError ] = useState<any>(null);
  const [ placeToStay, setPlaceToStay ] = useState<any>('');
  const [ toggleCompleted, setToggleCompleted ] = useState<boolean>(true);
  const [ totalPercentage, setTotalPercentage ] = useState<number>(0);

  function changeToggle(e:any) {
    console.log(e)
    setToggleCompleted(!toggleCompleted)
  }
  
  useEffect(() => {
    setStatus('loading')
    props.setSelectedWindow('ams')
    axios.get(`http://localhost:9000/maps/detail/${accomodationId}`) 
      .then((result)=>{
        setPlaceToStay(result.data)
        setStatus('resolved')
      })
      .catch((error)=>{
        setError(error)
        setStatus('error')
      })
  }, [])

  if (status === "loading" || placeToStay === '') {
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
      <Error404/>
    )
  }

  else {
    return (
      <Container maxWidth="container.xxl" bgColor="#F8F9FD">
        <Flex
          h="full"
          p="7% 20% 5% 15%"
          marginLeft="3vw"
          direction={{ base: "column", md: "row" }}
        >
          <VStack spacing={4}>
            <HStack w="70vw" justifyContent="space-between">
              <VStack alignItems="flex-start">
                <HStack>
                  <Heading size="xl" marginRight="1.5vw">
                    {placeToStay.accomodation.nameHotel}
                  </Heading>
                  <Box
                    backgroundColor={colorsProgressCompletionMaps[0]}
                    p="0% 2% 0% 2%"
                    w="10vw"
                    textAlign="center"
                    borderRadius="2em"
                    borderWidth="3px"
                    borderColor="#858585"
                    color="black.700"
                    fontWeight="bold"
                  >
                    {progressCompletionMaps[0]}
                  </Box>
                </HStack>
                <Text color="black.400" fontSize="xl">
                  Accesibility Mapping Progress | <b>{category}</b>{" "}
                </Text>
              </VStack>
              <Button
                rightIcon={<RiArrowGoBackLine />}
                background="transparent"
                fontSize="3em"
                width="1.5em"
                height="1.5em"
                borderRadius="2em"
                _hover={{ bg: "transparent", transform: "scale(1.1)" }}
                _active={{
                  bg: "transparent",
                  transform: "scale(1.2)",
                }}
                _focus={{
                  outline: "0",
                }}
                onClick={() => {
                  navigate(`/maps`);
                }}
              ></Button>
            </HStack>

            <HStack
              w="full"
              spacing={4}
              justifyContent="space-between"
              alignItems="top"
            >
              <HStack
                w="full"
                p={4}
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
                bgColor="#FFF"
                _hover={{ cursor: "pointer" }}
                onClick={() => {navigate(`/mappers/${placeToStay.mapper.idMapper}`)}}
              >
                <Box>
                  <Image 
                    marginTop="12%" 
                    borderRadius="full"
                    width="4em"
                    height="4em" 
                    src={placeToStay.mapper.photo === "No information" ? `https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg` : placeToStay.mapper.photo } 
                    alt="Mapper Profile Image" />
                </Box>
                <VStack alignItems="left" paddingLeft="0.5rem">
                  <Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">
                    Mapped by
                  </Text>
                  <Text fontSize="xl" color="black.500">
                    {`${placeToStay.mapper.name} ${placeToStay.mapper.lastname}`}
                  </Text>
                </VStack>
              </HStack>
              <HStack
                p={4}
                w="full"
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
                bgColor="#FFF"
              >
                <Hotel width='3em'/>
                <VStack alignItems="left" paddingLeft="0.5rem">
                  <Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">
                    Acommodation Type
                  </Text>
                  <Text fontSize="xl" color="black.500">
                    {placeToStay.accomodation.type}
                  </Text>
                </VStack>
              </HStack>
              <HStack
                p={4}
                w="full"
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
                bgColor="#FFF"
              >
                <Location width='4.5em'/>
                <VStack alignItems="left" paddingLeft="0.5rem">
                  <Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">
                    Address
                  </Text>
                  <Text fontSize="sm" color="black.500">
                    {placeToStay.accomodation.address}
                  </Text>
                </VStack>
              </HStack>
            </HStack>

            <VStack
              alignItems="left"
              w="full"
              p={5}
              shadow="md"
              borderWidth="1px"
              bgColor="#FFF"
              borderColor="black.200"
              borderRadius="lg"
            >
              <Heading fontSize="xl" mb={4}>
                Overall Progress
              </Heading>
              <HStack justifyContent="space-around" alignItems="start">
                <VStack>
                  <Text
                    marginInlineStart="0px"
                    color="blue.main"
                    fontWeight="700"
                  >
                    Percentage Completed
                  </Text>
                  <MapProgressbar
                    progress={totalPercentage}
                    showProgress={true}
                  ></MapProgressbar>
                </VStack>
                <Divider
                  border="2px solid"
                  borderColor="lightgray.main"
                  borderRadius="full"
                  orientation="vertical"
                  bgColor="lightgray.main"
                />
                <VStack>
                  <Text color="blue.main" fontWeight="700">
                    Date Created
                  </Text>
                  <Text fontSize="3xl" fontWeight="800">
                    {`${placeToStay.progress.created[8]}${placeToStay.progress.created[9]}`}
                  </Text>
                  <Text fontWeight="700" fontSize="sm">
                    {`${MonthsOfTheYear[parseInt(placeToStay.progress.created.slice(5,7))]} ${placeToStay.progress.created.slice(0,4)}`}
                  </Text>
                </VStack>
                <Divider
                  border="2px solid"
                  borderColor="lightgray.main"
                  borderRadius="full"
                  orientation="vertical"
                  bgColor="lightgray.main"
                />
                <VStack>
                  <Text color="blue.main" fontWeight="700">
                    Mapping Duration
                  </Text>
                  <Text fontSize="3xl" fontWeight="800">
                    {placeToStay.progress.duration}
                  </Text>
                  <Text fontWeight="700" fontSize="sm">
                    Days
                  </Text>
                </VStack>
                <Divider
                  border="2px solid"
                  borderColor="lightgray.main"
                  borderRadius="full"
                  orientation="vertical"
                  bgColor="lightgray.main"
                />
                <VStack>
                  <Text color="blue.main" fontWeight="700">
                    Last Update
                  </Text>
                  <Text fontSize="3xl" fontWeight="800">
                    {`${placeToStay.progress.lastUpdate?placeToStay.progress.lastUpdate[8]:""}${placeToStay.progress.lastUpdate?placeToStay.progress.lastUpdate[9]:""}`}
                  </Text>
                  <Text fontWeight="700" fontSize="sm">
                    {placeToStay.progress.lastUpdate?`${MonthsOfTheYear[parseInt(placeToStay.progress.lastUpdate.slice(5,7))]} ${placeToStay.progress.lastUpdate.slice(0,4)}`:""}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <HStack w="full">
              <Grid
                column={3}
                columnGap={3}
                rowGap={3}
                w="full"
                h="3vw"
                marginTop="3vw"
                color="black.main"
              >
                <GridItem colSpan={2} bg="blue.main" h="4px" marginTop="0.7vw">
                  <HStack
                    width="full"
                    height="0.9em"
                    borderWidth="1px"
                    borderColor="transparent"
                    borderBottomColor="white"
                  ></HStack>
                </GridItem>
                <GridItem colSpan={1} textAlign="center" paddingTop={0}>
                  <Heading fontSize="xl">Areas Progress</Heading>
                </GridItem>
                <GridItem
                  colStart={4}
                  colEnd={6}
                  bg="blue.main"
                  h="4px"
                  marginTop="0.7vw"
                >
                  <HStack
                    width="full"
                    height="0.9em"
                    borderWidth="1px"
                    borderColor="transparent"
                    borderBottomColor="white"
                  ></HStack>
                </GridItem>
              </Grid>
            </HStack>
            <AreasProgressCardsCollection accomodationId={accomodationId} toggleCompleted={toggleCompleted} setTotalPercentage={setTotalPercentage} totalPercentage={totalPercentage}/>
            <HStack alignItems="left" width="100%">
              <Text
                textAlign="left"
                color="black.500"
                size="lg"
                fontWeight="bold"
              >
                Show non completed areas
              </Text>
              <Switch size="lg" defaultChecked={toggleCompleted} onChange={changeToggle} />
            </HStack>
          </VStack>
        </Flex>
      </Container>
    );
  }
}

export default MapDetails;