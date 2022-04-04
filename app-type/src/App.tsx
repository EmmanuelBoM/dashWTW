import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Select,
  Checkbox,
  Button,
  HStack,
  Image,
  AspectRatio,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <Container maxWidth="container.xl" padding={20}>
      <Flex height="full" p={10}>
        <VStack width="full" height="full" padding={10} alignItems="flex-start" >
          <VStack alignItems="flex-start">
            <Heading>Your details</Heading>
            <Text>If you already have an accout, click here to log in</Text>
          </VStack>
          <Grid column={2} columnGap={3} rowGap={6}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="John"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Doe"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input placeholder="Blvd. Broken dreams 21"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl >
                  <FormLabel>City</FormLabel>
                  <Input placeholder="Pachuca"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select>
                    <option value="mx">Mexico</option>
                    <option value="eu">Estados Unidos </option>
                    <option value="cd">Canada </option>
                  </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox defaultChecked={true}>Ship to the bilding adress</Checkbox>
            </GridItem>
            <GridItem colSpan={2}>
              <Button width="full">Place Order</Button>
            </GridItem>
          </Grid>
        </VStack>
        <VStack width="full" height="full" padding={10} alignItems="flex-start">
          <VStack>
            <Heading>Your details</Heading>
            <Text>If you already have an accout, click here to log in</Text>
          </VStack>
          <HStack width="full">
            <AspectRatio ratio={1} width={24}>
              <Image src="https://i.pinimg.com/280x280_RS/98/83/91/988391d3457e7f34bd7d8d4a80f4041e.jpg"/>
            </AspectRatio>
          </HStack>
          
        </VStack>
      </Flex>
    </Container>
  </ChakraProvider>
)
