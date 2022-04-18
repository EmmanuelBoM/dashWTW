import React, { useState } from 'react'

// Importing PropTypes
import { IPropTypes } from './menu.types';

// Importing images
import Logo from '../../assets/descargaWTW1.png'
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
import { useNavigate } from "react-router-dom";

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
   
  return(
    <Box bg='#000000' display="inline-block" position="fixed" left={0}>
      <Menu >
        <Image src={Logo} />
        <Box h={10}></Box>
        <MenuItem display="inline-block"
                  _focus={{ bg: 'black.main' }}
                  _hover={{ transform: 'scale(0.98)',
                            bg: 'black.main' }}
                  onClick={()=>{navigate(`/landing`)}}>
          <Image src={ChangeImageAMS(props.window)} paddingLeft = {9}/>
          <Box>
            <Text align="center" color={ChangeColorAMS(props.window)}>
              AMS
            </Text>
            <Text align="center" color={ChangeColorAMS(props.window)}>
              Maps
            </Text>
          </Box>
        </MenuItem>
        <Box h={25}></Box>
        <MenuItem display="inline-block"
                  _focus={{ bg: 'black.main' }}
                  _hover={{ transform: 'scale(0.98)',
                            bg: 'black.main' }}
                  onClick={()=>{navigate(`/mappers`)}}>
          <VStack>
            <Image src={ChangeImageMAP(props.window)} paddingLeft ='0px'/>
            <Text paddingLeft='0px' color={ChangeColorMAP(props.window)}>Mappers</Text>
          </VStack>
        </MenuItem>
        <Box h={300}></Box>
        <MenuItem display="inline-block"
                  _focus={{ bg: 'black.main' }}
                  _hover={{ transform: 'scale(0.98)',
                            bg: 'black.main' }}
                  onClick={()=>{navigate(`/login`)}}>
          <VStack>
            <Image src={LogOutIMG} paddingLeft ='0px'/>
            <Text paddingLeft ='0px' color='white'>Log Out</Text>
          </VStack>
        </MenuItem>
        <Box h={40}></Box>
      </Menu>
    </Box>
  )
}

export default MenuComponent