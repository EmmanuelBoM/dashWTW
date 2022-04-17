import * as React from "react"

// Importing ChakraUI Components
import {
  Container,
  Flex,
  Image
} from "@chakra-ui/react"

// Importing SignIn Form custom component
import { SignInForm } from '../../components';

// LOG IN VIEW ---------------------------
export const LogIn = () => (
  <Container maxWidth="container.xxl" 
             bg='black'>
		<Flex h="100vh" 
          w='full' 
          textAlign='center' 
          p='7% 20% 5% 15%' 
          direction={{ base: "column", md: "row" }} >
      <Image marginLeft='0vw' 
             marginTop='5vw' 
             marginRight='6vw' 
             boxSize='70%' 
             objectFit='cover' 
             src='https://yt3.ggpht.com/ytc/AKedOLTqfmzzNJXFj_68GOpz6aZDrXKWDXlp_SCpc5Vr=s900-c-k-c0x00ffffff-no-rj' 
             alt='Wheel The World Logo'/>
      <SignInForm/>
		</Flex>
	</Container>
)

export default LogIn;