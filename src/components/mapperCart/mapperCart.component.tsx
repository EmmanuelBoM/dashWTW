import React, {useRef} from 'react';
import {
	VStack,
	HStack,
	Text,
	AspectRatio,
	Image,
	Button
} from "@chakra-ui/react";

import { IPropTypes } from './mapperCart.types';
import { Link } from 'react-router-dom';
import "./mapperCart.modules.css"

function MapperCart(props: IPropTypes): JSX.Element { 
  const mailRef:any = useRef();
  return (
    <Link to={`/mappers/${props.mapper.name.id}`} >
        <VStack
        id="card-mapper"
        borderRadius="2xl"
        bg="black.100"
        p={3}
        w="17rem"
        marginBottom="1.5rem !important"
        spacing={4}	
        boxShadow="4px 11px 28px rgba(0, 0, 0, 0.08);"
        cursor="pointer"	
        _hover={{ backgroundColor: '#3E5A8C', color:'#fff !important' }}
    >
      <VStack alignItems="center" p={0} spacing={3} className="mapper-info" textAlign="center">
        <AspectRatio  w={20} height={20}>
            <Image marginTop="12%" borderRadius="full" src={props.mapper.name.photo === null ? `https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg` : props.mapper.name.photo} alt="Mapper Profile Image" />
        </AspectRatio>
        <Text fontWeight="500" fontSize="xl" color="black.700" id="mapper-name" >{`${props.mapper.name.name} ${props.mapper.name.lname} `}</Text>
      </VStack>
      <VStack border="1px solid #DFE0EB" borderRadius="lg" w="15rem" p={3}>
        <VStack>
          <Text fontWeight="bold" size="md">
            Maps
          </Text>
        </VStack>
        <HStack w="80%" justifyContent="space-between" alignItems="center">
          <VStack w="50%" h="3em">
            <Text color="black.400" fontSize="sm">
              Done
            </Text>
            <Text fontWeight="800" fontSize="lg">
              {props.mapper.maps.done}
            </Text>
          </VStack>
          <VStack
            w="0.15rem"
            h="2.5em"
            borderRadius="full"
            backgroundColor="#DFE0EB"
            border=" 1px solid #DFE0EB"
          ></VStack>
          <VStack w="50%" h="3em">
            <Text color="black.400" fontSize="sm">
              In progress
            </Text>
            <Text fontWeight="800" fontSize="lg">
              {props.mapper.maps.progress}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack>
        <Button
          id='btn-contact-mapper'
          marginTop={3.5}
          border=" 1px solid #DFE0EB"
          color="#2F6FE4"
          fontWeight="700"
          borderRadius="full"
          className='card-contact'
          px={6}
          size="md"
          bg="transparent"
          onClick={(e) => {
            // OPTION 1: stop propagation of the child event to the father
            e.stopPropagation();
          }}
          ref={mailRef}
        >
          <a id='link-contact-mapper' href={`mailto:${props.mapper.contact}`}>
            Contact
          </a>
        </Button>
      </VStack>
    </VStack>
    </Link>	
    );
  }
export default MapperCart;