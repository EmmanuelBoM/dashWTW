import * as React from "react";

// Importing ChakraUI Components
import { Container, Flex, Image } from "@chakra-ui/react";

// Importing SignIn Form custom component
import { SignInForm } from "../../components";

// Importing WTW logo
import WTWLogo from '../../assets/WTW-logo.jpg'

// LOG IN VIEW ---------------------------
export const LogIn = () => (
  <Container maxWidth="container.xxl" bg="black">
    <Flex
      w="full"
      textAlign="center"
      p="7% 20% 5% 15%"
      direction={{ base: "column", md: "row" }}
    >
      <Image
        marginLeft="0vw"
        marginTop="5vw"
        marginRight="6vw"
        boxSize="44%"
        objectFit="cover"
        src={WTWLogo}
        alt="Wheel The World Logo"
      />
      <SignInForm />
    </Flex>
  </Container>
);

export default LogIn;
