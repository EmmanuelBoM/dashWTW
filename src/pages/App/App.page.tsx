import * as React from "react"
import {
  Container,
  Flex,
} from "@chakra-ui/react"

export const App = () => (
  <Container maxWidth="container.xxl" bg='#f8f9d'>
		<Flex h="100vh" w='full' p='7% 20% 5% 15%' direction={{ base: "column", md: "row" }} >
      {/*Aquí se deben probar todos los componentes.*/}
		</Flex>
	</Container>
)

export default App;
