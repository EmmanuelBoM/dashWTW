import * as React from "react"
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
  Divider
} from "@chakra-ui/react"

import MapsTable from "../../components/MapsTable";
import MenuComponent from "../../components/Menu/menu.component";
import hotelLogo from "../../assets/hotelLogo.png"
import locationIcon from "../../assets/locationIcon.png"
import MapProgressbar from "../../components/MapProgressbar";

let hotelName:string = "The Grand Mayan"
let category:string = "Place To Stay"
let mapperName:string = "Tom Cruise"
let acommodationType:string = "Hotel"
let hotelAddress:string = "Blvrd Riviera Nayarit 254, 63735 Nuevo Vallarta, Nay."

export const MapDetails = () => (
	<Container maxWidth="container.xxl" bg='#f8f9d'>
		<MenuComponent window={"ams"}/>
		<Flex h="full" p='7% 20% 5% 15%' marginLeft="3vw" direction={{ base: "column", md: "row" }}>
			<VStack spacing={4}>
				<HStack w='70vw' justifyContent='space-between'>
					<VStack alignItems='flex-start'>
						<HStack>
							<Heading size="xl">{hotelName}</Heading>
							{/*TO DO: Barrita de progreso*/}
						</HStack>
						
						<Text color='black.400' fontSize="xl">Accesibility Mapping Progress | <b>{category}</b> </Text>
					</VStack>

					{/*TO DO: Botón de regreso */}
				</HStack>

				
				<HStack w="full" spacing={4} justifyContent="space-between" alignItems="top" >
						<HStack w="full" p={4} shadow='md' borderWidth='1px' borderColor='black.200' borderRadius='lg'>
							<Image
								borderRadius='full'
								boxSize='50px'
								src='https://bit.ly/dan-abramov'
								alt='Dan Abramov'
								/>
							<VStack alignItems="left" paddingLeft="0.5rem">
								<Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">Mapped by</Text>
								<Text fontSize="xl" color="black.500">{mapperName}</Text>
							</VStack>
						</HStack>
						<HStack p={4} w="full"  shadow='md' borderWidth='1px' borderColor='black.200'  borderRadius='lg'>
							<Image
								boxSize='50px'
								src={hotelLogo}
								alt='Dan Abramov'
								/>
							<VStack alignItems="left" paddingLeft="0.5rem">
								<Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">Acommodation Type</Text>
								<Text fontSize="xl" color="black.500">{acommodationType}</Text>
							</VStack>
						</HStack>
						<HStack p={4} w="full" shadow='md' borderWidth='1px' borderColor='black.200'  borderRadius='lg'>
							<Image
								boxSize='50px'
								src={locationIcon}
								alt='Dan Abramov'
								/>
							<VStack alignItems="left" paddingLeft="0.5rem">
								<Text color="blue.main" fontWeight="700" marginBottom="-0.5rem">Address</Text>
								<Text fontSize="sm" color="black.500">{hotelAddress}</Text>
							</VStack>
						</HStack>
				</HStack>


				<VStack alignItems="left" w="full" p={5} shadow='md' borderWidth='1px' borderColor='black.200' borderRadius='lg'>
					<Heading fontSize='xl' mb={4}>Overall Progress</Heading>
					<HStack justifyContent="space-around" alignItems="start">
						<VStack>
							<Text color="blue.main" fontWeight="700" >Percentage Completed</Text>
							<MapProgressbar progress={80} showProgress={true}></MapProgressbar>
						</VStack>
						<Divider  border="2px solid" borderColor="lightgray.main" borderRadius="full" orientation='vertical' bgColor="lightgray.main"/>
						<VStack>
							<Text color="blue.main" fontWeight="700" >Date Created</Text>
							<Text  fontSize="3xl" fontWeight="800">21</Text>
							<Text fontWeight="700" fontSize="sm" >May, 2021</Text>
						</VStack>
						<Divider  border="2px solid" borderColor="lightgray.main" borderRadius="full" orientation='vertical' bgColor="lightgray.main"/>
						<VStack>
							<Text color="blue.main" fontWeight="700" >Mapping Duration</Text>
							<Text  fontSize="3xl" fontWeight="800">6</Text>
							<Text fontWeight="700" fontSize="sm" >Days</Text>
						</VStack>
						<Divider  border="2px solid" borderColor="lightgray.main" borderRadius="full" orientation='vertical' bgColor="lightgray.main"/>
						<VStack>
							<Text color="blue.main" fontWeight="700" >Last Update</Text>
							<Text  fontSize="3xl" fontWeight="800">25</Text>
							<Text fontWeight="700" fontSize="sm" >May, 2021</Text>
						</VStack>
					</HStack>
				</VStack>
			</VStack>
		</Flex>	
	</Container>
)

export default MapDetails;
