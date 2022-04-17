import * as React from "react"

// Imports of PropTypes
import { IPropTypes } from './Error404.types';

// Imports of ChakraUI components
import {
  Container,
  Button,
  Text,
  Image,
  Flex
} from "@chakra-ui/react"

// Importing react-router-dom component
import { useNavigate } from "react-router-dom";

// Importing the menu
import MenuComponent from "../../components/Menu/menu.component";


// ERROR404 VIEW-----------------------------------
function Error404(props: IPropTypes): JSX.Element {

	// Function that allows navigation using react-router-dom
	let navigate = useNavigate()

  // Var that stores the current focus inside the menu
  let currentView:string = "ams"

	return(
		<Container maxWidth="container.xxl" 
					     bg='#f8f9d'>
			<MenuComponent window={currentView}/>
      <Flex h="full" 
            p='7% 20% 5% 15%' 
            marginLeft="9vw" 
            direction={{ base: "column", md: "column" }} 
            alignItems='center'>
        <Image width='45%' 
                src='https://wheeltheworld.com/Error%20404.svg' 
                alt='Error 404: Page Not Found' />
        <Text marginTop='2vw' 
              marginBottom='1vw' 
              fontSize='1.5em' 
              fontWeight='700' >Woops! Sorry, this page doesn't exist.
        </Text>
        <Button borderRadius="2em" 
                borderColor='transparent' 
                variant='login-button-clicked' 
                fontWeight='700' 
                onClick={()=>{navigate(`/landing`)}}>Go back to the Dashboard
        </Button>
      </Flex>
		</Container>
  )
}

export default Error404;