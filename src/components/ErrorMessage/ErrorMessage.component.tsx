import * as React from "react"

// Imports of PropTypes
import { IPropTypes } from './ErrorMessage.types';

// Imports of ChakraUI components
import {
  Container,
  Button,
  Text,
  Image,
  Flex
} from "@chakra-ui/react"
import GeneralError from '../../assets/Error.svg'
import DataError from '../../assets/ErrorData.svg'

// Importing react-router-dom component
import { useNavigate } from "react-router-dom";

// ERROR404 VIEW-----------------------------------
function ErrorMessage(props: IPropTypes): JSX.Element {

	return(
		<Container maxWidth="container.xxl" 
					     bg='#f8f9d'>
      <Flex h="full" 
            p='7% 20% 5% 15%' 
            marginLeft="9vw" 
            direction={{ base: "column", md: "column" }} 
            alignItems='center'>
        <Image width='35%' 
                src={props.type === "general" ? GeneralError:DataError } 
                alt='Error 404: Page Not Found' />
        <Text marginTop='2vw' 
              marginBottom='1vw' 
              fontSize='1.5em' 
              fontWeight='700' >{props.error}
        </Text>
      </Flex>
		</Container>
  )
}

export default ErrorMessage;