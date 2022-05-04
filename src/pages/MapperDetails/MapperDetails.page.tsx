import * as React from "react"

// Importing PropTypes
import { IPropTypes } from './MapperDetails.types';

//Imports chakra ui Components
import {
  Container,
  Flex,
  VStack,
  Heading,
  HStack,
  Text,
  Image,
  Divider,
  InputGroup,
  Input, 
  InputLeftElement,
  Button
} from "@chakra-ui/react"

//Imports custom Componentes
import MapsTable from "../../components/MapsTable";
import FilterMapsComp from "../../components/FilterMapsComp";

//Imports icons 
import { Search2Icon } from "@chakra-ui/icons";
import { RiArrowGoBackLine } from "react-icons/ri";

//Imports useNavigate hook from React Router
import { useNavigate } from "react-router-dom";

//Variables used
let mapperName:string = "Tom Cruise"

function MapperDetails(props: IPropTypes): JSX.Element  {
	let navigate = useNavigate();
	return (
    <Container maxWidth="container.xxl" bgColor="#F8F9FD">
      <Flex
        h="full"
        p="7% 20% 5% 15%"
        marginLeft="3vw"
        direction={{ base: "column", md: "row" }}
      >
        <VStack spacing={20} >
          <HStack w="70vw" justifyContent="space-between">
            <HStack w="50%" spacing={4}>
              <Image
                borderRadius="full"
                boxSize="100px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
              <VStack alignItems="flex-start">
                <HStack>
                  <Heading size="xl">{mapperName}</Heading>
                </HStack>

                <Text color="black.400" fontSize="xl">
                  Places to stay mapper
                </Text>
              </VStack>
            </HStack>
            
            <Button
              rightIcon={<RiArrowGoBackLine />}
              background="transparent"
              fontSize="3em"
              width="1.5e m"
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
                navigate(`/mappers`);
              }}
            ></Button>
          </HStack>

          <VStack  spacing={4} w="full">
              <VStack
                spacing={3}
                alignItems="start"
                bgColor="#FFF"
                w="100%"
                p={4}
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
              >
                <Heading fontSize="xl" mb={4}>
                  Contributions
                </Heading>
                <HStack justifyContent="space-around" w="full">
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700">
                      Total Contributions
                    </Text>
                    <Text fontSize="3xl" fontWeight="800">
                      6
                    </Text>
                  </VStack>
                  <Divider
                    border="2px solid"
                    borderColor="lightgray.main"
                    borderRadius="full"
                    orientation="vertical"
                    bgColor="lightgray.main"
                  />
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700">
                      WTW Listed Contributions
                    </Text>
                    <Text fontSize="3xl" fontWeight="800">
                      6
                    </Text>
                  </VStack>
                  <Divider
                    border="2px solid"
                    borderColor="lightgray.main"
                    borderRadius="full"
                    orientation="vertical"
                    bgColor="lightgray.main"
                  />
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700">
                      Contributions In Progress
                    </Text>
                    <Text fontSize="3xl" fontWeight="800">
                      6
                    </Text>
                  </VStack>
                  <Divider
                    border="2px solid"
                    borderColor="lightgray.main"
                    borderRadius="full"
                    orientation="vertical"
                    bgColor="lightgray.main"
                  />
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700">
                      Average completion time
                    </Text>
                    <Text fontSize="3xl" fontWeight="800">
                      21
                    </Text>
                    <Text fontWeight="700" fontSize="sm">
                      Days
                    </Text>
                  </VStack>
                </HStack>
                
              </VStack>

            <HStack spacing={4} w="full" alignItems="start">
              <VStack
                spacing={3}
                alignItems="start"
                w="35%"
                bgColor="#FFF"
                p={4}
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
              >
                <Heading fontSize="xl" mb={4}>
                  Latest activity
                </Heading>
                <VStack w="full">
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700" fontSize="lg">
                      Last Reply
                    </Text>
                    <Text color="blue.main" fontWeight="400" fontSize="md">
                      Date and Hour
                    </Text>
                    <Text fontSize="3xl" fontWeight="800">
                      6
                    </Text>
                  </VStack>
                  <Divider
                    w="80%"
                    border="2px solid"
                    borderColor="lightgray.main"
                    borderRadius="full"
                    orientation="horizontal"
                    bgColor="lightgray.main"
                  />
                  <VStack textAlign="center" w="full">
                    <Text color="blue.main" fontWeight="700" fontSize="lg">
                      Last completed area
                    </Text>
                    
                    <Text fontSize="3xl" fontWeight="800">
                      6
                    </Text>
                  </VStack>
                </VStack>
                

              </VStack>

              <VStack
                alignItems="start"
                h="full"
                w="65%"
                p={4}
                bgColor="#FFF"
                shadow="md"
                borderWidth="1px"
                borderColor="black.200"
                borderRadius="lg"
                spacing={8}
              >
                <HStack justifyContent="space-between" w="100%">
                  <Heading fontSize="xl">Contributions in progress</Heading>

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
            </HStack>
          </VStack>
         
        </VStack>
      </Flex>
    </Container>
  );
}
	


export default MapperDetails;
