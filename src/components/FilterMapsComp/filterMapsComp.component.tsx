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

let name:string[]= ["City","Country"];

function perCity(x:string[], name:string, filterData:any, setFilterData:any, setMaps:any, setStatus:any, setError:any, calendarEndDate:any, calendarStartDate:any): JSX.Element{
	
	
	const handleChange = async(event:any, type:string)=>{
		if(type=="City"){
			await setFilterData({countries:[], cities: event})
			
		}
		if(type=="Country"){
			await setFilterData({countries: event, cities:[]})
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
						<Checkbox value= {x[i]} > {x[i]} </Checkbox>):<MenuItemOption > </MenuItemOption>}
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
		fetchMapData(props.calendarEndDate, props.calendarStartDate)
	  }, [props.filterData])
	
	const fetchMapData = (calendarEndDate:any, calendarStartDate:any) =>{
		if(props.tableType==="picker"){
			axios({
				method: 'post',
				url: `http://localhost:9000/maps/table/${calendarStartDate}/${calendarEndDate}`,
				data: props.filterData,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			})
			.then((result)=>{
				props.setMaps(result.data)
				setStatus('resolved')
			})
			.catch(error =>{
				setError(error)
			})
		}
		if(props.tableType==="contributions"){
			axios({
				method: 'post',
				url: `http://localhost:9000/mappers/contributions/${props.mapperId}`,
				data: props.filterData,
				headers: {
				  'Content-type': 'application/json; charset=UTF-8',
				}
			  })
			  .then((result)=>{
				props.setMaps(result.data)
				setStatus('resolved')
			  })
			  .catch((error)=>{
				setError(error)
				setStatus('error')
			  })
		}
		
	}
	
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
          {perCity(cities, name[0],  props.filterData, props.setFilterData, props.setMaps, props.setStatus, props.setError, props.calendarEndDate, props.calendarStartDate)}
          {perCity(countries, name[1], props.filterData, props.setFilterData, props.setMaps, props.setStatus, props.setError, props.calendarEndDate, props.calendarStartDate)}
        </MenuOptionGroup>
      </MenuList>}
      
    </Menu>
  );
}


export default MapsFilter;