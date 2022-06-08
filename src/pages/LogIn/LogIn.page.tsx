import * as React from "react";
import { useState, useEffect } from "react";

// Importing Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

// Importing react-router-dom
import { useNavigate } from "react-router-dom";

// Importing ChakraUI Components
import { Container, Flex, Image } from "@chakra-ui/react";

// Importing SignIn Form custom component
import { SignInForm } from "../../components";

// Importing WTW logo
import WTWLogo from '../../assets/WTW-logo.jpg';

// Importing Firebase functions
import {
  auth,
  signInWithEmail,
  signInWithGoogle
} from "../../utils/firebase";

// LOG IN VIEW ---------------------------
function LogIn () {

  const [ user, loading, error ] = useAuthState(auth);
  const [ errorMessage, setErrorMessage ] = useState("");
  const navigate = useNavigate();

  useEffect( () => {
    if(!loading && user) {
        navigate("/maps")
      }
  }, [user, loading])

  return(
    <Container maxWidth="container.xxl" height="full" bg="black">
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
        <SignInForm 
          user={user}
          loading={loading}
          error={error}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          signInWithEmail={signInWithEmail}
          signInWithGoogle={signInWithGoogle}/>
      </Flex>
    </Container>
  );
}

export default LogIn;