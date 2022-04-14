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

import { FaDoorOpen, FaUtensils } from 'react-icons/fa'

import { SignInForm } from '../../components';

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

export const MapsOverview = () => (
  <Container maxWidth="container.xxl" >
		<Flex h="full" w='full' p='7% 20% 5% 15%' direction={{ base: "column", md: "row" }}>
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
            <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='40vw' h='25vw' textAlign='center'/>
            <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='20vw' h='25vw' textAlign='center'/>
          </HStack>
        </Box>

        <HStack w='full' justifyContent='space-between'>
          <Box p={5} shadow='md' borderWidth='1px'  w='40vw' borderRadius='lg'>
            <Heading fontSize='xl'>All Maps</Heading>
            <Text color='black.400' marginBottom='1.5vw'>This Week</Text>
            <HStack justifyContent='space-evenly'>
              <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='full' h='25vw' textAlign='center'/>
            </HStack>
          </Box>
          <Box p={5} shadow='md' borderWidth='1px'  w='29vw' borderRadius='lg'>
            <Heading fontSize='xl'>History: Completed AMS Maps</Heading>
            <Text color='black.400' marginBottom='1.5vw'>This Week</Text>
            <HStack justifyContent='space-evenly'>
              <Box borderWidth='5px' borderRadius='lg' borderColor='black.main' w='full' h='25vw' textAlign='center'/>
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