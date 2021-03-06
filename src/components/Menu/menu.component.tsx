import React from 'react'

// Importing PropTypes
import { IPropTypes } from './menu.types';

// Importing images
import Logo from '../../assets/WTW-logo.png'
import AMSMapsLogo from '../../assets/amsLogo.png'
import AMSMapsLogoB from '../../assets/amsLogoB.png'
import LogOutIMG from '../../assets/logOutLogo.png'
import MappersLogo from '../../assets/mappersLogo.png'
import MappersLogoB from '../../assets/mappersLogoB.png'

// Importing ChakraUI Components
import {
  Box,
  Text,
  VStack,
  Menu,
  MenuItem,
  Image
} from "@chakra-ui/react"

// Importing react-router-dom function that allows navigation
import { useNavigate, Outlet } from "react-router-dom";

// MENU COMPONENT-------------------------------------------
function MenuComponent(props: IPropTypes): JSX.Element {
  function ChangeImageAMS(window:string): string{
    if(window == "ams"){
      return AMSMapsLogo
    } else{
      return AMSMapsLogoB
    }
  }

  function ChangeImageMAP(window:string): string{
    if(window == "mappers"){
      return MappersLogo
    } else{
      return MappersLogoB
    }   
  }

  function ChangeColorAMS(window:string): string{
    if(window == "ams"){
      return "#FFFFFF"
    } else{
      return "#808080"
    }
  }

  function ChangeColorMAP(window:string): string{
    if(window == "mappers"){
      return "#FFFFFF"
    } else{
      return "#808080"
    }
  }

  let navigate = useNavigate()
   
  return (
    <React.Fragment>
      <Box bg="#000000" display='inline-flex' flexDirection='column' position="fixed" left={0} height="full" width="9vw">
      <Menu>
        <Image src={Logo} />
        <Box h="2%"></Box>
        <MenuItem
          display="inline-flex"
          flexDirection='column'
          marginBottom='5vh'
          _focus={{ bg: "black.main" }}
          _hover={{ transform: "scale(0.98)", bg: "black.main" }}
          onClick={() => {
            navigate(`/maps`);
          }}
        >
          <Image src={ChangeImageAMS(props.selectedWindow)} paddingBottom={2} />
          <Box>
            <Text align="center" color={ChangeColorAMS(props.selectedWindow)}>
              AMS
            </Text>
            <Text align="center" color={ChangeColorAMS(props.selectedWindow)}>
              Maps
            </Text>
          </Box>
        </MenuItem>
        <Box h="2%"></Box>
        <MenuItem
          display="inline-block"
          _focus={{ bg: "black.main" }}
          marginBottom='5vh'
          _hover={{ transform: "scale(0.98)", bg: "black.main" }}
          onClick={() => {
            navigate(`/mappers`);
          }}
        >
          <VStack>
            <Image src={ChangeImageMAP(props.selectedWindow)} paddingLeft="0px" />
            <Text paddingLeft="0px" color={ChangeColorMAP(props.selectedWindow)}>
              Mappers
            </Text>
          </VStack>
        </MenuItem>
        <Box h="25%"></Box>
        <MenuItem
          display="inline-flex"
          flexDirection='column'
          marginTop='20vh'
          _focus={{ bg: "black.main" }}
          _hover={{ transform: "scale(0.98)", bg: "black.main" }}
          onClick={() => {
            navigate(`/login`);
          }}
        >
            <VStack>
              <Image src={LogOutIMG} paddingLeft="0px" onClick={props.handleLogout} />
              <Text paddingLeft="0px" color="white">
                Sign Out
              </Text>
            </VStack>
          </MenuItem>
          <Box h="25%"></Box>
        </Menu>
      </Box>
      <Outlet/>
    </React.Fragment>
  );
}

export default MenuComponent