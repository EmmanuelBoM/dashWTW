import React from 'react';

// Importing ChakraUI Components
import {
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import Google from 'wtw-icons/_icons/Google'; // Importing wtw icons to simulate the auth-with-Google button

// Importing PropTypes
import { IPropTypes } from './signInForm.types';

// SIGN IN FORM COMPONENT----------------------------------------
function SignInForm(props: IPropTypes): JSX.Element {

	return (
		<VStack
			h="76.5vh" 
			w="full" 
			p={10}
			spacing={10}
			alignItems="center"
			bg="black.main"
			borderWidth='1px'
			borderColor='transparent'
			justifyContent="center"
			paddingLeft='6vw'
			borderLeftColor='white'
		>
			<VStack alignItems="center" 
              p={0}
              color='white'>
				<Heading size="xl" 
						paddingBottom={5}>Welcome back!
				</Heading>
				<Button variant='with-shadow' 
                leftIcon={<Google width='1em'/>} 
                isLoading={false} 
                loadingText='CONNECTING TO GOOGLE'
				onClick={props.signInWithGoogle}>SIGN IN WITH GOOGLE
				</Button>
			</VStack>

			<Grid column={3} 
            columnGap={3} 
            rowGap={3} 
            w="full" 
            h='auto' 
            color='white'>
			</Grid>

			<form>
				<Grid column={2} 
				columnGap={3} 
				rowGap={6} 
				w="full" 
				color='white'>

					<GridItem colSpan={1} 
					w='90%' 
					paddingLeft='11%'>
						<Text fontSize='xs' 
								textAlign='center'>This site is protected by the Google Privacy Policy and Terms of Service apply.
						</Text>
					</GridItem>
				</Grid>
			</form>
			{props.errorMessage ? <Text color="red.400">{props.errorMessage}</Text> :null}
			
		</VStack>
	);
}

export default SignInForm;