import React, { useState } from 'react'
import { IPropTypes } from './menu.types';
import Logo from '../../assets/descargaWTW1.png'
import AMSMapsLogo from '../../assets/amsLogo.png'
import AMSMapsLogoB from '../../assets/amsLogoB.png'
import LogOutIMG from '../../assets/logOutLogo.png'
import MappersLogo from '../../assets/mappersLogo.png'
import MappersLogoB from '../../assets/mappersLogoB.png'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Container,
  Image
} from "@chakra-ui/react"
import { ColorModeSwitcher } from '../../ColorModeSwitcher';



function MenuComponent(props: IPropTypes): JSX.Element {


   function ChangeImageAMS(window:string): string{
      if(window == "ams"){
        return AMSMapsLogo
      }else{
        return AMSMapsLogoB
      }
    }
   function ChangeImageMAP(window:string): string{
    if(window == "mappers"){
      return MappersLogo
    }else{
      return MappersLogoB
    }   
  }

  function ChangeColorAMS(window:string): string{
    if(window == "ams"){
      return "#FFFFFF"
    }else{
      return "#808080"
    }
  }

  function ChangeColorMAP(window:string): string{
    if(window == "mappers"){
      return "#FFFFFF"
    }else{
      return "#808080"
    }
  }
   
  return(
    <Box bg='#000000' display="inline-block" position="fixed" left={0}>
      <Menu >
          <Image src={Logo} />
          <Box h={10}></Box>
          <MenuItem display="inline-block" >
            <Image src={ChangeImageAMS(props.window)} paddingLeft = {9} />
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
          <MenuItem>
          <VStack>
            <Image src={ChangeImageMAP(props.window)} paddingLeft = {7}/>
            <Text paddingLeft={6} color={ChangeColorMAP(props.window)}>Mappers</Text>
          </VStack>
          </MenuItem>
          <Box h={300}></Box>
          <MenuItem>
            <VStack>
            <Image src={LogOutIMG} paddingLeft = {8}/>
            <Text paddingLeft={7}>Log Out</Text>
            </VStack>
          </MenuItem>
          <Box h={40}></Box>
      </Menu>

    </Box>
  )
}


export default MenuComponent