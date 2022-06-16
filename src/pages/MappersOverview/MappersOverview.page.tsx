import * as React from "react"
import { useState, useEffect } from "react"

//Imports chakra ui Components
import {
  Container,
  Flex,
  Heading,
  Box,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons";

// Importing react-router-dom library
import { useNavigate } from "react-router-dom";

//Imports stylesheet
import './MappersOverview.modules.css'

// Imports custom Components
import FilternSort from "../../components/FilternSort";
import MappersCardsCollection from "../../components/MappersCardsCollection";
import Error404 from "../Error404";
import ErrorMessage from "../../components/ErrorMessage";

// Imports PropTypes
import { IPropTypes } from "./MappersOverview.types";


export const MappersOverview = (props:IPropTypes) => {
  
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  const [ filterOrderSelection, setFilterOrderSelection ] = useState<string>('asc')
  const [ filterCompletionSelection, setFilterCompletionSelection ] = useState<string>('cmaps')
  const [ status, setStatus ] = useState<string>('');
  const [ error, setError ] = useState<any>(null);

  function querying(e:any) {
    setSearchQuery(e.target.value)
  }

  let navigate = useNavigate();

  useEffect( () => {
    if(!props.loading && !props.user) {
      navigate("/")
      console.log("effect")
      console.log(props.loading)
      console.log(props.loading)
    } else {
      navigate("/mappers")
    }
  }, [props.user, props.loading]) 
  if (status === "loading") {
    return(
      <h1>Loading...</h1>
    )
  }

  if (status === "error") {
    return (
      <>
        {error.message === "Request failed with status code 404" ? <Error404 user={props.user} loading={props.loading}/>  : <ErrorMessage error="Woops! Something went wrong" type="general"/>  }
      </>
      
    )
  }

  else {
    return(
      <Container maxWidth="container.xxl" bgColor="#F8F9FD">
        <Flex
          p="7% 20% 5% 15%"
          marginLeft="3vw"
          direction={{ base: "column", md: "row" }}
        >
          <VStack spacing={20}>
            <HStack w="70vw" justifyContent="space-between" alignItems="end">
              <VStack alignItems="flex-start">
                <Box>
                  <Heading fontSize="1.5em" color="blue.600">
                    {`Welcome, ${props.user?.displayName}`}
                  </Heading>
                </Box>
                <Heading size="xl">Mappers Overview</Heading>
              </VStack>
              <HStack alignItems="center" w="35vw" justifyContent="space-around">
                <InputGroup marginRight="1rem">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                  />
                  <Input
                    onChange={querying}
                    value={searchQuery}
                    placeholder="Search by: Name"
                    borderColor="lightgray.main"
                    borderRadius="lg"
                  ></Input>
                </InputGroup>
                <FilternSort 
                  setFilterOrderSelection={setFilterOrderSelection} 
                  setFilterCompletionSelection={setFilterCompletionSelection}/>
              </HStack>
            </HStack>
            <MappersCardsCollection
              filterOrderSelection={filterOrderSelection} 
              filterCompletionSelection={filterCompletionSelection}
              setSelectedWindow={props.setSelectedWindow}
              searchQuery={searchQuery}/>
          </VStack>
        </Flex>
      </Container>
    )
  }
};

export default MappersOverview;