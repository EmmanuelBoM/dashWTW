import * as React from "react"
import {
  Container,
  Flex,
  Grid,
  GridItem,
  VStack,
  Heading
} from "@chakra-ui/react"

export const MapDetails = () => (
  <Container maxWidth="container.xxl" bg='#f8f9d'>
		<Flex h="100vh" w='full' p='7% 20% 5% 15%' direction={{ base: "column", md: "row" }} >
			<Grid templateColumns='repeat(15, 1fr)' columnGap={4} rowGap={4} w="full">
				<GridItem colSpan={11}>
					<VStack w="full" 
						className='general-card'
						borderRadius="md" 
						border="1px solid"
						borderColor="blackAlpha.300" 
						boxShadow="4px 11px 28px rgba(0, 0, 0, 0.08);"
						alignItems="flex-start"
						p={4}>
						<Heading fontSize="md">All maps</Heading>
					</VStack>
				</GridItem>

				<GridItem colSpan={4}>
					<VStack w="full" 
						borderRadius="md" 
						border="1px solid"
						borderColor="blackAlpha.300" 
						boxShadow="4px 11px 28px rgba(0, 0, 0, 0.08);"
						alignItems="flex-start"
						p={4}>
						<Heading fontSize="md">History: All maps completed</Heading>
					</VStack>
				</GridItem>
			</Grid>
		</Flex>
	</Container>
)

export default MapDetails;
