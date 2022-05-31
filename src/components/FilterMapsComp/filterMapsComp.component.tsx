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

import Error404 from "../../pages/Error404";
import axios from "axios";
import "./filterMapsComp.modules.css"

let name:string[]= ["City","Country"];

let perCity=(x:string[],name:string)=>(
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
				<CheckboxGroup >
					{x.length !== 0 ? x.map((data,i)=> 
					<Checkbox value= {i.toString()} onChange={()=>{alert(x[i]+name)}}> {x[i]} </Checkbox>):<MenuItemOption > webos </MenuItemOption>}
				</CheckboxGroup>
			</VStack>
		</MenuList>
	</Menu>
)

function MapsFilter(): JSX.Element {
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
          {perCity(cities, name[0])}
          {perCity(countries, name[1])}
        </MenuOptionGroup>
      </MenuList>}
      
    </Menu>
  );
}


export default MapsFilter;