import * as React from "react"
import { useState } from "react"
import { useLocalStorage } from "../../useLocalStorage";

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

//Imports stylesheet
import './MappersOverview.modules.css'

// Imports custom Components
import FilternSort from "../../components/FilternSort";
import MappersCardsCollection from "../../components/MappersCardsCollection";

// Imports PropTypes
import { IPropTypes } from "./MappersOverview.types";

// Variables used
let username:string = "Arturo Gaona"

export const MappersOverview = (props:IPropTypes) => {
  
  const [ searchQuery, setSearchQuery ] = useState<string>('')
  const [ filterOrderSelection, setFilterOrderSelection ] = useState<string>('asc')
  const [ filterCompletionSelection, setFilterCompletionSelection ] = useState<string>('cmaps')

  function querying(e:any) {
    setSearchQuery(e.target.value)
  }

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
                  Welcome, {username}
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
};

export default MappersOverview;