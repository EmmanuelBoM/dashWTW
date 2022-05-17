import * as React from "react"
import { useState, useEffect } from "react"

// Importing PropTypes
import { IPropTypes } from './MapperDetails.types';

// Imports axios
import axios from "axios"

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
import {  Column } from 'react-table'
//Imports custom Componentes
import MapsTable from "../../components/MapsTable";
import FilterMapsComp from "../../components/FilterMapsComp";

//Imports icons 
import { Search2Icon } from "@chakra-ui/icons";
import { RiArrowGoBackLine } from "react-icons/ri";

//Imports useNavigate and useParams hook from React Router
import { Link, useNavigate, useParams } from "react-router-dom";
import Error404 from "../Error404";
import {IData} from '../../components/MapsTable/mapsTable.types'
import MapProgressbar from "../../components/MapProgressbar";

//Variables used
let mapperName:string = "Tom Cruise"

function MapperDetails(props: IPropTypes): JSX.Element  {
	let navigate = useNavigate();
  const [ status, setStatus ] = useState<string>('loading');
  const [ error, setError ] = useState<any>(null);
  const [ contributions, setContributions ] = useState<IData[]>([]);
  const [ details, setDetails ] = useState<any>(null);
  let params = useParams();
  let dataArr: any = [];
	  
	const columns: Column<IData>[] = React.useMemo(
    () => [
      {
        Header: "Place name",
        accessor: "placeName",
		Cell: ({ cell: { value } }) => (
			<Link to="/the-grand-mayan">{value}</Link>
		  ),
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Mapping progress",
        accessor: "progress",
        isNumeric: true,
        Cell: ({ cell: { value } }) => (
          <MapProgressbar
            progress={value}
            showProgress={false}
          ></MapProgressbar>
        ),
      },
    ],
    []
  	);

  useEffect(()=>{
    setStatus('loading')
    
    axios.get(`http://localhost:9000/mappers/details/${params.mapperId}`) // Devuelve lista de mappers
      .then((result)=>{
        setDetails(result.data)
        setStatus('resolved')
        axios.get(`http://localhost:9000/mappers/contributions/${params.mapperId}`) // Devuelve lista de mappers
          .then((result)=>{
            setContributions(result.data)
            setStatus('resolved')
          })
          .catch((error)=>{
            setError(error)
            setStatus('error')
          })
      })
      .catch((error)=>{
        setError(error)
        setStatus('error')
      })
    }, [])

    if (status === "loading") {
      return(
        <h1>Loading...</h1>
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
            <VStack spacing={20} >
              <HStack w="70vw" justifyContent="space-between">
                <HStack w="50%" spacing={4}>
                  <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={details.name.photo === null ? `https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg` : details.name.photo }
                    alt={`${details.name.name} ${details.name.lname}`}
                  />
                  <VStack alignItems="flex-start">
                    <HStack>
                      <Heading size="xl">{`${details.name.name} ${details.name.lname}`}</Heading>
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
                          {details.contributions.total}
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
                          {details.contributions.WTWcontributions}
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
                          {details.contributions.inprogress}
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
                          {details.contributions.averageTime}
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
                        {details.replies.lastReply}
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
                        
                        <Text fontSize="2xl" fontWeight="700">
                          {details.replies.lastCompletedArea.Area}
                        </Text>
                        <Text fontSize="md">{details.replies.lastCompletedArea.location.name}</Text>
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
                    <MapsTable data={contributions} columns={columns}></MapsTable>
                  </VStack>
                </HStack>
              </VStack>
            
            </VStack>
          </Flex>
        </Container>
      );
    }
}
	


export default MapperDetails;
