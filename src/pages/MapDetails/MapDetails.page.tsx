import * as React from "react"

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
  CircularProgress, 
  CircularProgressLabel,
  Switch,
  Button,
} from "@chakra-ui/react"

// Importing the react-router-dom function that allows navigation
import { useNavigate } from "react-router-dom";

// Importing custom components
import MenuComponent from "../../components/Menu/menu.component";
import MapProgressbar from "../../components/MapProgressbar";

// Importing images
import hotelLogo from "../../assets/hotelLogo.png"
import locationIcon from "../../assets/locationIcon.png"

// Importing icons from react-icons
import { RiArrowGoBackLine } from "react-icons/ri";

// Vars that contain the main info of the view
let hotelName:string = "The Grand Mayan"
let category:string = "Place To Stay"
let mapperName:string = "Tom Cruise"
let acommodationType:string = "Hotel"
let hotelAddress:string = "Blvrd Riviera Nayarit 254, 63735 Nuevo Vallarta, Nay."

// These vars contain the mapped areas and their progress, respectively
let areasMapped:string[] = ["Building Entrance", "Food Service Area", "Lobby/Reception"]
let percentagePerMappedArea:number[] = [100, 70, 50]

// These vars contain the statuses of completion of all maps
let progressCompletionMaps:string[] = ["In progress", "Completed", "Not started"]
let colorsProgressCompletionMaps:string[] = ["#FFB800", "green", "red"]

// MAP DETAILS VIEW---------------------------------------------------------------------
function MapDetails(props: IPropTypes): JSX.Element {

	// Function that allows navigation (react-router-dom)
	let navigate = useNavigate()

	return(
		<Container maxWidth="container.xxl" 
               bg='#f8f9d'>
			<MenuComponent window={"ams"}/>
			<Flex h="full" 
            p='7% 20% 5% 15%' 
            marginLeft="3vw" 
            direction={{ base: "column", md: "row" }}>
				<VStack spacing={4}>
					<HStack w='70vw' 
                  justifyContent='space-between'>
						<VStack alignItems='flex-start'>
							<HStack>
								<Heading size="xl" 
                         marginRight='1.5vw'>{hotelName}
                </Heading>
                <Box backgroundColor={colorsProgressCompletionMaps[0]}
                    p='0% 2% 0% 2%'
                    w='7vw'
                    textAlign='center'
                    borderRadius='2em'
                    borderWidth='3px'
                    borderColor='#858585'
                    color='black.700'
                    fontWeight='bold'>{progressCompletionMaps[0]}
                </Box>
							</HStack>
							<Text color='black.400' fontSize="xl">Accesibility Mapping Progress | <b>{category}</b> </Text>
						</VStack>
            <Button rightIcon={<RiArrowGoBackLine/>}
                background='transparent'
                fontSize='3em'
                width='1.5em'
                height='1.5em'
                borderRadius='2em'
                _hover={{ bg: 'transparent',
                      transform: 'scale(1.1)',
                }}
                _active={{
                  bg: 'transparent',
                  transform: 'scale(1.2)',
                }}
                _focus={{
                  outline: '0',
                }}
                onClick={()=>{navigate(`/landing`)}}>
            </Button>				
			    </HStack>
					
					<HStack w="full" 
                  spacing={4} 
                  justifyContent="space-between" 
                  alignItems="top" >
            <HStack w="full" 
                    p={4} 
                    shadow='md' 
                    borderWidth='1px' 
                    borderColor='black.200' 
                    borderRadius='lg'>
              <Image borderRadius='full'
                      boxSize='50px'
                      src='https://bit.ly/dan-abramov'
                      alt='Dan Abramov'/>
              <VStack alignItems="left" 
                      paddingLeft="0.5rem">
                <Text color="blue.main" 
                      fontWeight="700" 
                      marginBottom="-0.5rem">Mapped by
                </Text>
                <Text fontSize="xl" 
                      color="black.500">{mapperName}
                </Text>
              </VStack>
						</HStack>
            <HStack p={4} 
                    w="full"  
                    shadow='md' 
                    borderWidth='1px' 
                    borderColor='black.200'  
                    borderRadius='lg'>
              <Image boxSize='50px'
                      src={hotelLogo}
                      alt='Dan Abramov'/>
              <VStack alignItems="left" 
                      paddingLeft="0.5rem">
                <Text color="blue.main" 
                      fontWeight="700" 
                      marginBottom="-0.5rem">Acommodation Type
                </Text>
                <Text fontSize="xl" 
                      color="black.500">{acommodationType}
                </Text>
              </VStack>
            </HStack>
            <HStack p={4} 
                    w="full" 
                    shadow='md' 
                    borderWidth='1px' 
                    borderColor='black.200'  
                    borderRadius='lg'>
              <Image boxSize='50px'
                      src={locationIcon}
                      alt='Dan Abramov'/>
              <VStack alignItems="left" 
                      paddingLeft="0.5rem">
                <Text color="blue.main" 
                      fontWeight="700" 
                      marginBottom="-0.5rem">Address
                </Text>
                <Text fontSize="sm" 
                      color="black.500">{hotelAddress}
                </Text>
              </VStack>
            </HStack>
				  </HStack>


					<VStack alignItems="left" 
                  w="full" 
                  p={5} 
                  shadow='md' 
                  borderWidth='1px' 
                  borderColor='black.200' 
                  borderRadius='lg'>
						<Heading fontSize='xl' 
                     mb={4}>Overall Progress
            </Heading>
						<HStack justifyContent="space-around" 
                    alignItems="start">
							<VStack>
								<Text marginInlineStart='0px' 
                      color="blue.main" 
                      fontWeight="700" >Percentage Completed
                </Text>
								<MapProgressbar progress={80} 
                                showProgress={true}></MapProgressbar>
							</VStack>
							<Divider  border="2px solid" 
                        borderColor="lightgray.main" 
                        borderRadius="full" 
                        orientation='vertical' 
                        bgColor="lightgray.main"/>
							<VStack>
								<Text color="blue.main" 
                      fontWeight="700" >Date Created
                </Text>
								<Text fontSize="3xl" 
                      fontWeight="800">21
                </Text>
								<Text fontWeight="700" 
                      fontSize="sm" >May, 2021
                </Text>
							</VStack>
							<Divider border="2px solid" 
                       borderColor="lightgray.main" 
                       borderRadius="full" 
                       orientation='vertical' 
                       bgColor="lightgray.main"/>
							<VStack>
								<Text color="blue.main" 
                      fontWeight="700" >Mapping Duration
                </Text>
								<Text fontSize="3xl" 
                      fontWeight="800">6
                </Text>
								<Text fontWeight="700" 
                      fontSize="sm" >Days
                </Text>
							</VStack>
							<Divider  border="2px solid" 
                        borderColor="lightgray.main" 
                        borderRadius="full" 
                        orientation='vertical' 
                        bgColor="lightgray.main"/>
							<VStack>
								<Text color="blue.main" 
                      fontWeight="700" >Last Update
                </Text>
								<Text fontSize="3xl" 
                      fontWeight="800">25
                </Text>
								<Text fontWeight="700" 
                      fontSize="sm" >May, 2021
                </Text>
							</VStack>
						</HStack>
					</VStack>
					<HStack w='full'>
          <Grid column={3} 
                columnGap={3} 
                rowGap={3} 
                w="full" 
                h='3vw' 
                marginTop='3vw' 
                color='black.main'>
            <GridItem colSpan={2} 
                      bg='blue.main' 
                      h='4px' 
                      marginTop='0.7vw'>
              <HStack width='full' 
                      height='0.9em' 
                      borderWidth='1px' 
                      borderColor='transparent' 
                      borderBottomColor='white'>
              </HStack>
            </GridItem>
            <GridItem colSpan={1} 
                      textAlign='center' 
                      paddingTop={0}> 
              <Heading fontSize='xl'>Areas Progress</Heading>
            </GridItem>
            <GridItem colStart={4} 
                      colEnd={6} 
                      bg='blue.main' 
                      h='4px' 
                      marginTop='0.7vw'>
              <HStack width='full' 
                      height='0.9em' 
                      borderWidth='1px' 
                      borderColor='transparent' 
                      borderBottomColor='white'>
              </HStack>
            </GridItem>
          </Grid>
          </HStack>
            <Grid templateColumns='repeat(3, 1fr)'
                  gap={4}
                  w="full">
              {areasMapped.map((area:string, index:number) => (
              <GridItem>
                <VStack p={5} 
                        shadow='md' 
                        borderWidth='1px'  
                        w='22vw' 
                        borderRadius='lg'>
                  <Heading fontSize='xl' 
                            color='black.main' 
                            fontWeight='bold' 
                            marginTop='1vw' 
                            marginBottom='2vw'>{area}
                  </Heading>
                  <CircularProgress value={percentagePerMappedArea[index]} 
                                    size='120px'>
                    <CircularProgressLabel color='#2F6FE4' 
                                            fontSize='lg' 
                                            fontWeight='bolder'>{percentagePerMappedArea[index]}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </VStack>
              </GridItem>))}
            </Grid>
            <HStack alignItems='left' 
                    width='100%'>
              <Text textAlign='left' 
                    color='black.500' 
                    size='lg' 
                    fontWeight='bold'>Show non completed areas
              </Text>
              <Switch size='lg'/>
          </HStack>
			  </VStack>
			</Flex>	
		</Container>
	)
}

export default MapDetails;