import React from "react";

// Imports from d3-fetch y d3-scale
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";

// Imports from Chakra UI
import {
  Container,
  Flex,
  Heading,
  Box,
  Text,
  Wrap,
  VStack,
  HStack,
  Grid,
  GridItem,
  StackDivider,
  Divider,
  InputGroup,
  InputLeftElement,
  Input,
  Stack
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons";

// Imports of custom components
import CalendarDatePicker from '../../components/CalendarDatePicker/CalendarDatePicker.component';
import MapsTable from '../../components/MapsTable/mapsTable.component';

// Imports of icons from wtw icons
import Entrance from 'wtw-icons/_icons/Entrance'
import Restaurant from 'wtw-icons/_icons/Restaurant'
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

// Imports of Map Items from React Simple Maps
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

// Imports of charts from React Google Charts
import { Chart } from "react-google-charts";
import FilterMapsComp from "../../components/FilterMapsComp";

// Importing WTW Icons
import Countries from 'wtw-icons/_icons/Countries'; 
import Destinations from 'wtw-icons/_icons/Destinations'; 

// VARS-------------------------------------------------------------

// Username
let username:string = 'Arturo Gaona'

// Submitted and inProgress maps
let submittedMaps = 16
let inProgressMaps = 11

// Arrays of existing areas into the AMS
let areasAMS:any[] = [["Building Entrance", <BuildingEntrance width="1em" height="1em"/> ],
                      ["Lobby Reception", <Lobby width="1em" height="1em"/>],
                      ["Room One", <QueenBed width="1em" height="1em"/>],
                      ["Room Two", <QueenBed width="1em" height="1em"/>],
                      ["Room Three", <QueenBed width="1em" height="1em"/>],
                      ["General Accessibility", <GeneralAttribute width="1em" height="1em"/>],
                      ["Food Service Area", <FoodService width="1em" height="1em"/>],
                      ["Swimming Pool", <SwimmingPool width="1em" height="1em"/>],
                      ["Fitness Center", <Gym width="1em" height="1em"/>],
                      ["Beachfront", <Beachfront width="1em" height="1em"/>],
                      ["Parking Area", <Parking/>],
                      ["Common Area Toilet", <Bathroom width="1em" height="1em"/>],
                      ["Other Areas", <Other width="1em" height="1em"/>],
                      ["Elevator", <Elevator width="1em" height="1em"/>]]                        

// Arrays of least mapped areas and least answered questions
let leastAnsweredQuestions:string[] = ["Which type is the room?", "What is the maximum occupancy (adults/children) of this room?"]
let leastMappedAreas:string[] = ["Building Entrance", "Food Service Area", "Beachfront"]
let iconsTextLeastMappedAreas:any[] = areasAMS.filter( (area) => { for(let i = 0; i < leastMappedAreas.length; i++) if (leastMappedAreas[i] === area[0]) return true})
let leastMappedAreasIcons:string[] = ["FaDoorOpen", "FaUtensils"]

// AvgTimeMapCompletion
let avgCompletionTimePerMap = 6
let avgNumberPhotos = 8

// Data of map
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colours:any = ["#ffedea", "#ff5233"]
const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(colours);

// Data of bar chart
const data = [
  [
    "Element",
    "Published Listings",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["US", 18, "#FF7562", 18],
  ["MX", 12, "#FF7562", 12],
  ["PE", 8, "#FF7562", 8],
  ["CN", 8, "color: #FF7562", 8],
  ["RU", 6, "color: #FF7562", 6],
];

// Options of bar chart
const options = {
  title: "Listing Highlights",
  width: 350,
  height: 500,
  fontName: "Lato",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

// Data of line chart
const dataLineChart = [
  ["Week", "Maps"],
  ["1 '22", 45],
  ["2 '22", 20],
  ["3 '22", 70],
  ["4 '22", 50],
  ["5 '22", 20],
  ["6 '22", 35],
  ["7 '22", 60],
  ["8 '22", 50],
];

// Options of line chart
const optionsLineChart = {
  curveType: "function",
  fontName: "Lato",
  legend: { position: "bottom" },
};

export const MapsOverview = () => (
  <Container maxWidth="container.xxl" bgColor="#F8F9FD">
    <Flex
      h="full"
      p="7% 20% 5% 15%"
      marginLeft="3vw"
      direction={{ base: "column", md: "row" }}
    >
      <VStack spacing={10}>
        <HStack w="70vw" justifyContent="space-between" marginBottom={10}>

          <VStack alignItems="flex-start">
            <Box>
              <Heading fontSize="1.5em" color="blue.600">
                Welcome, {username}
              </Heading>
            </Box>
            <Heading size="xl">AMS Maps Overview</Heading>
          </VStack>

          <VStack alignItems="flex-start" w="33vw">
            <Text color="black.600">View statistics by:</Text>
            <CalendarDatePicker />
          </VStack>
        </HStack>

        <VStack spacing={6} w="full">
          {/* /Summary Card */}
          <Box
            p={5}
            shadow="md"
            w="full"
            borderWidth="1px"
            borderColor="black.200"
            borderRadius="lg"
            bgColor="#FFF"
            
          >
            <Heading fontSize="xl">Weekly Summary</Heading>
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
                    {submittedMaps}
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
                    {inProgressMaps}
                  </Text>
                </Box>
              </VStack>
            </HStack>
          </Box>

          {/* /All Maps Table Card */}
          <VStack
              p={5}
              shadow="md"
              borderWidth="1px"
              w="100%"
              borderRadius="lg"
              borderColor="black.200"
              spacing={8}
              bgColor="#FFF"
            >
              <HStack justifyContent="space-between" w="100%">
                <VStack>
                  <Heading fontSize="xl">All Maps</Heading>
                  <Text color="black.400" marginBottom="1.5vw">
                    This Year
                  </Text>
                </VStack>
                <HStack>
                  <InputGroup w="80%">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                      placeholder="Search by: Name"
                      borderColor="lightgray.main"
                      borderRadius="lg"
                    ></Input>
                  </InputGroup>
                  <FilterMapsComp></FilterMapsComp>
                </HStack>
              </HStack>

              <MapsTable></MapsTable>
          </VStack>
        </VStack>
        
        
        <VStack spacing={6} w="full">
          
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
                <Heading fontSize="xl">All Time Statistics</Heading>
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

          {/* /Worldwide Insights Card */}
          <VStack
            p={5}
            shadow="md"
            borderWidth="1px"
            w="full"
            borderRadius="lg"
            borderColor="black.200"
            bgColor="#FFF"
            alignItems="start"
            spacing={4}
          >
            <VStack>
              <Heading fontSize="xl">Worldwide Insights</Heading>
              <Text color="black.400" marginBottom="1.5vw">
                Zoom and Pan | This Week
              </Text>
            </VStack>
            
            
            <HStack justifyContent="space-evenly">
              <Wrap borderRadius="lg" w="40vw" h="auto" textAlign="center">
                <ComposableMap
                  projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
                >
                  <ZoomableGroup zoom={1}>
                    <Sphere
                      id="1"
                      fill="transparent"
                      stroke="#E4E5E6"
                      strokeWidth={0.5}
                    />
                    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo, idx: number) => {
                          const d = data.find((s) => true);
                          console.log(colorScale(1));
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={"#FF7562"}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
              </Wrap>
              <Box h="auto" textAlign="center">
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="100%"
                  data={data}
                  options={options}
                />
              </Box>
            </HStack>
            
            <VStack w="full">
              <Divider
                w="85%"
                border="2px solid"
                borderColor="lightgray.main"
                borderRadius="full"
                orientation="horizontal"
                bgColor="lightgray.main"
              />
            </VStack>
            

            <VStack w="full">
              <Heading fontSize="xl">Worldwide Presence</Heading>
              <HStack w="full" justifyContent="space-around">
                <VStack spacing={-2}>
                  <HStack spacing={4}>
                    <Countries width="3em" color="#2f6fe4"></Countries>
                    <Text color="blue.main" fontWeight="600" fontSize="xl" textAlign="center">Number of <br /> Countries</Text>
                  </HStack>
                  <Text fontWeight="600" fontSize="3xl">28</Text>
                </VStack>
                <VStack spacing={-2}>
                  <HStack spacing={4}>
                    <Destinations width="3em" color="#2f6fe4"></Destinations>
                    <Text color="blue.main" fontWeight="600" fontSize="xl" textAlign="center">Number of <br /> Destinations</Text>
                  </HStack>
                  <Text fontWeight="600" fontSize="3xl">123</Text>
                </VStack>
              </HStack>
            </VStack>
            

          </VStack>

          <HStack
            spacing={4}
            textAlign="center"
            marginBottom="6vw"
            alignItems="start"
            height="15%"
            width="100%"
            justifyContent="space-evenly"
          >
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              w="22vw"
              borderRadius="lg"
              borderColor="black.200"
              bgColor="#FFF"
              height="100%"
            >
              <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                Average number of photos per map
              </Heading>
              <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                <Text
                  fontSize="2em"
                  color="black.800"
                  fontWeight="bold"
                >
                  {avgNumberPhotos}
                </Text>
                <Text color="black.800" marginBottom="1.5vw">
                  Photos
                </Text>
              </Box>
            </Box>

            <Stack divider={<StackDivider borderColor="black.200" />}
                p={5}
                shadow="md"
                borderWidth="1px"
                w="22vw"
                borderRadius="lg"
                borderColor="black.200"
                bgColor="#FFF"
                height="100%"
                justify='space-around'>
              <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                Least Mapped Areas
              </Heading>
              <VStack
                divider={<StackDivider borderColor="black.200" />}
                p={2}
                w="100%"
                height="100%"
                justify='space-around'
              >
                {iconsTextLeastMappedAreas.map((area: any) => (
                  <Box color="black.800" display='inline-flex' justifyContent='space-around'>
                    <span>
                      {area[1]}
                    </span>
                    <Text marginLeft='0.7em'>
                      {area[0]}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Stack>

            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              w="22vw"
              borderRadius="lg"
              borderColor="black.200"
              bgColor="#FFF"
              height="100%"
            >
              <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                Average completion time per map
              </Heading>
              <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                <Text
                  fontSize="2em"
                  color="black.800"
                  fontWeight="bold"
                >
                  {avgCompletionTimePerMap}
                </Text>
                <Text color="black.800" marginBottom="1.5vw">
                  Days
                </Text>
              </Box>
            </Box>
          </HStack>

          <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              w="100%"
              borderRadius="lg"
              borderColor="black.200"
              bgColor="#FFF"
            >
              <Heading fontSize="xl">History: Completed AMS Maps</Heading>
              <Text color="black.400" marginBottom="1.5vw">
                This Year
              </Text>
              <HStack justifyContent="space-evenly">
                <Box w="full" h="25vw" textAlign="center">
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="100%"
                    data={dataLineChart}
                    options={optionsLineChart}
                  />
                </Box>
              </HStack>
          </Box>
        </VStack>
        

      </VStack>
    </Flex>
  </Container>
);

export default MapsOverview;