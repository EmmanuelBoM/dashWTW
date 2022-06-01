import * as React from "react" 
import { useState, useEffect } from "react";
// Importing ChakraUI components
import {
	Button,	
	MenuDivider,
	Menu,
	MenuList,
	MenuOptionGroup,
	MenuButton,
	MenuItemOption,
	CheckboxGroup,
	Checkbox,
	VStack,
	Text
} from "@chakra-ui/react";
import axios from "axios";
import "./filterMapsComp.modules.css"
import { IPropTypes } from './filterMapsComp.types';

//Library used to convert filters to string params
var qs = require('qs');

let name:string[]= ["City","Country"];

	
function perCity(x:string[],name:string, setCitiesFilter:any, setCountriesFilter:any, citiesFilter:string, countriesFilter:string): JSX.Element{
	
	const handleChange = (event:any, type:string)=>{
		
		
		if(type=="City"){
			setCitiesFilter(event.toString())
		}
		if(type=="Country"){
			setCountriesFilter(event.toString())
		}


		
	}

	return(
		<Menu closeOnSelect={false} >
			<MenuButton fontWeight="s" 
						textAlign="start" 
						paddingLeft={10} 
						w="full" 
						as={Button} 
						colorScheme='black' 
						variant='ghost'>
				{name}
			</MenuButton>
			<MenuList height="15rem" overflowY="scroll">
				<VStack paddingLeft={5} 
						alignItems="flex-start">
					<CheckboxGroup onChange={(e)=>{handleChange(e, name)}}>
						{x.length !== 0 ? x.map((data,i)=> 
						<Checkbox value= {x[i]} > {x[i]} </Checkbox>):<MenuItemOption > webos </MenuItemOption>}
					</CheckboxGroup>
				</VStack>
			</MenuList>
		</Menu>
	)
}

function MapsFilter(props: IPropTypes): JSX.Element {
	const [ status, setStatus ] = useState<string>('loading');
  	const [ error, setError ] = useState<any>(null);
  	const [countries, setCountries] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);

	useEffect(()=>{
		axios.get(`http://localhost:9000/mappers/countries`) // Devuelve lista de mappers
		  .then((result)=>{
			setCountries(result.data.countries)
			setCities(result.data.cities)
			setStatus('resolved')
		  })
		  .catch((error)=>{
			setError(error)
			setStatus('error')
		  })
	  },[])
	  
	
	return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        leftIcon={<i className="fa-solid fa-filter sort-icon"></i>}
        colorScheme="black"
        variant="ghost"
        color="black.600"
      >
        Filter
      </MenuButton>
	  
	  {status==="error"?<Text>{error}</Text>:<MenuList p={4}>
        <MenuOptionGroup
          defaultValue="1"
          title="Filter by"
          color="#2F6FE4"
          type="radio"
        >
          <MenuItemOption value="1">All</MenuItemOption>
          <MenuItemOption value="2">Completed</MenuItemOption>
          <MenuItemOption value="3">Non completed</MenuItemOption>
        </MenuOptionGroup>

        <MenuDivider />

        <MenuOptionGroup defaultValue="0" type="radio" >
          {perCity(cities, name[0], props.setCitiesFilter, props.setCountriesFilter, props.citiesFilter, props.countriesFilter)}
          {perCity(countries, name[1], props.setCitiesFilter, props.setCountriesFilter, props.citiesFilter, props.countriesFilter)}
        </MenuOptionGroup>
      </MenuList>}
      
    </Menu>
  );
}


export default MapsFilter;