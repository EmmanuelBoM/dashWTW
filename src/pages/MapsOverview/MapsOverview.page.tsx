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
  createIcon
} from "@chakra-ui/react"

import  MenuComponent  from '../../components/Menu/menu.component';

import Table from '../../components/Table/table.component';

import { FaDoorOpen, FaUtensils } from 'react-icons/fa'

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

import { Chart } from "react-google-charts";

// This var contains the Username
let username:string = 'Arturo Gaona'

// Vars for submitted and inProgress maps
let submittedMaps = 16
let inProgressMaps = 11

// Vars to map the least mapped areas and least answered questions
let leastAnsweredQuestions:string[] = ["Which type is the room?", "What is the maximum occupancy (adults/children) of this room?"]
let leastMappedAreas:string[] = ["Building Entrance", "Food Service Area"]
let leastMappedAreasIcons:string[] = ["FaDoorOpen", "FaUtensils"]

// Var for avgTimeMapCompletion
let avgCompletionTimePerMap = 6

// Testing maps, var containing data
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// Testing charts, vars containing data
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

const options = {
  title: "Listing Highlights",
  width: 350,
  height: 500,
  fontName: "Lato",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

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

const optionsLineChart = {
  curveType: "function",
  fontName: "Lato",
  legend: { position: "bottom" },
};

export const MapsOverview = () => (
  <Container maxWidth="container.xxl" >
		<MenuComponent window={"ams"}/>
    <Flex h="full" w='full' p='7% 20% 5% 15%' marginLeft="3vw" direction={{ base: "column", md: "row" }}>
      <VStack spacing={4}>
        <HStack w='70vw' justifyContent='space-between'>
          <VStack alignItems='flex-start'>
            <Box>
              <Heading fontSize='1.5em' color='blue.600'>Welcome, {username}</Heading>
            </Box>
            <Heading size="xl">AMS Maps Overview</Heading>
          </VStack>
          <VStack alignItems='flex-start' w='25vw'>
            <Text color='black.600'>View statistics by:</Text>
            <Select placeholder='Pick a date' color='black.600'>
              <option value='option1'>May 25th 2022 - June 31st 2022</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </VStack>
        </HStack>

        <Box p={5} shadow='md' borderWidth='1px'  w='full' borderRadius='lg'>
          <Heading fontSize='xl'>Weekly Summary</Heading>
          <HStack justifyContent='space-evenly'>
            <VStack w='8vw'>
              <Text><span><b>Submitted</b></span> Maps</Text>
              <Box borderWidth='5px' borderRadius='lg' borderColor='blue.main' w='7vw' h='7vw' textAlign='center'>
                <Text fontSize='2em' fontWeight='bold' marginTop='25%'>{submittedMaps}</Text>
              </Box>
            </VStack>
            <VStack w='8vw'>
              <Text><span><b>In Progress</b></span> Maps</Text>
              <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='7vw' h='7vw' textAlign='center'>
                <Text fontSize='2em' fontWeight='bold' marginTop='25%'>{inProgressMaps}</Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

        <Box p={5} shadow='md' borderWidth='1px'  w='full' borderRadius='lg'>
          <Heading fontSize='xl'>Worldwide Insights</Heading>
          <Text color='black.400' marginBottom='1.5vw'>Zoom and Pan   |    This Week</Text>
          <HStack justifyContent='space-evenly'>
            <Wrap borderRadius='lg'  w='40vw' h='auto' textAlign='center'>
            <ComposableMap>
              <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography key={geo.rsmKey} geography={geo} />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            </Wrap>
            <Box w='17vw' h='auto' textAlign='center'>
            <Chart
              chartType="BarChart"
              width="100px"
              height="500px"
              data={data}
              options={options}
            />
            </Box>
          </HStack>
        </Box>

        <HStack w='full' justifyContent='space-between'>
          <Box p={5} shadow='md' borderWidth='1px'  w='40vw' borderRadius='lg'>
            <Heading fontSize='xl'>All Maps</Heading>
            <Text color='black.400' marginBottom='1.5vw'>This Year</Text>
            <HStack justifyContent='space-evenly'>
              <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='full' h='25vw' textAlign='center'>
                <Table></Table>
              </Box>
            </HStack>
          </Box>
          <Box p={5} shadow='md' borderWidth='1px'  w='29vw' borderRadius='lg'>
            <Heading fontSize='xl'>History: Completed AMS Maps</Heading>
            <Text color='black.400' marginBottom='1.5vw'>This Year</Text>
            <HStack justifyContent='space-evenly'>
              <Box w='full' h='25vw' textAlign='center'>
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={dataLineChart}
                options={optionsLineChart}
              />
              </Box>
            </HStack>
          </Box>
        </HStack>

        <HStack w='full'>
          <Grid column={3} columnGap={3} rowGap={3} w="full" h='3vw' marginTop='3vw' color='black.main'>
            <GridItem colSpan={2} bg='blue.main' h='4px' marginTop='0.7vw'>
              <HStack width='full' height='0.9em' borderWidth='1px' borderColor='transparent' borderBottomColor='white'></HStack>
            </GridItem>
            <GridItem colSpan={1} textAlign='center' paddingTop={0}> <Heading fontSize='xl'>All Time Statistics </Heading></GridItem>
            <GridItem colStart={4} colEnd={6} bg='blue.main' h='4px' marginTop='0.7vw'>
              <HStack width='full' height='0.9em' borderWidth='1px' borderColor='transparent' borderBottomColor='white'></HStack>
            </GridItem>
          </Grid>
        </HStack>
        
        <HStack spacing={4} textAlign='center' marginBottom='6vw'>
          <VStack divider={<StackDivider borderColor='black.200' />}
                  p={5} shadow='md' borderWidth='1px'  w='22vw' borderRadius='lg'>
            <Heading fontSize='xl' color='blue.main' fontWeight='bold'>Least Answered Questions</Heading>
            {leastAnsweredQuestions.map((answer:string) => (
              <Box color='black.800'>{answer}</Box>
              )
            )}
          </VStack>

          <VStack divider={<StackDivider borderColor='black.200' />}
                  p={5} shadow='md' borderWidth='1px'  w='22vw' borderRadius='lg'>
            <Heading fontSize='xl' color='blue.main' fontWeight='bold'>Least Mapped Areas</Heading>
            {leastMappedAreas.map((area:string) => (
              <Box color='black.800'><span><Icon as={FaUtensils} /></span>{area}</Box>
              )
            )}
          </VStack>

          <Box p={5} shadow='md' borderWidth='1px'  w='22vw' borderRadius='lg'>
              <Heading fontSize='xl' color='blue.main' fontWeight='bold'>Average completion time per map</Heading>
              <Text fontSize='2em' color='black.800' fontWeight='bold' marginTop='15%'>{avgCompletionTimePerMap}</Text>
              <Text color='black.800' marginBottom='1.5vw'>Days</Text>
          </Box>
        </HStack>

      </VStack>
		</Flex>
	</Container>
)

export default MapsOverview;