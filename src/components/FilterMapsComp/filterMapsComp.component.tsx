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
	Box,
	VStack,
	Text
} from "@chakra-ui/react";
import axios from "axios";
import "./filterMapsComp.modules.css"
import { IPropTypes } from './filterMapsComp.types';

let name:string[]= ["City","Country"];

enum EfilterDataProp  {
	City = "cities",
	Country = "countries"
}


function MapsFilter(props: IPropTypes): JSX.Element {
	const [ status, setStatus ] = useState<string>('loading');
  	const [ error, setError ] = useState<any>('');
  	const [countries, setCountries] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);
	// const [selectedCheckbox, setSelectedCheckbox] = useState<any>('');

	useEffect(()=>{
		axios.get(`https://apidash2.herokuapp.com/mappers/countries`) // Devuelve lista de mappers
		  .then((result)=>{
			setCountries(result.data.countries)
			setCities(result.data.cities)
			setStatus('resolved')
		  })
		  .catch((error)=>{
			setError(error.message)
			setStatus("error")
		  })
		fetchMapData(props.calendarEndDate, props.calendarStartDate)
	  }, [props.filterData])
	
	const fetchMapData = (calendarEndDate:any, calendarStartDate:any) =>{
		if(props.tableType==="picker"){
			axios({
				method: 'post',
				url: `https://apidash2.herokuapp.com/maps/table/${calendarStartDate}/${calendarEndDate}`,
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
				setStatus("error")
				setError(error.message)
			})
		}
		if(props.tableType==="contributions"){
			axios({
				method: 'post',
				url: `https://apidash2.herokuapp.com/mappers/contributions/${props.mapperId}`,
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
	
	const handleFilterChange = async(event:any)=>{
		if(event==1){
			await props.setFilterData({...props.filterData, filter:""})
		}
		if(event==2){
			await props.setFilterData({...props.filterData, filter:"complete"})
		}
		if(event==3){
			await props.setFilterData({...props.filterData, filter:"non-complete"})
		}
	}

	const handleCountriesChange = async(event:any, type:string)=>{
		
		if(type=="City"){
			await props.setFilterData({...props.filterData, countries:[], cities: event})
		}

		if(type=="Country"){
			await props.setFilterData({...props.filterData, countries: event, cities:[]})
		}
	}
	
	return (
		<Box>
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
				
				 <MenuList p={4}>
					<MenuOptionGroup
						defaultValue="1"
						title="Filter by"
						color="#2F6FE4"
						type="radio"
						onChange={(e)=>{handleFilterChange(e)}}
					>
						<MenuItemOption value="1">All</MenuItemOption>
						<MenuItemOption value="2">Completed</MenuItemOption>
						<MenuItemOption value="3">Non completed</MenuItemOption>
					</MenuOptionGroup>

					<MenuDivider />

					<MenuOptionGroup defaultValue="0" type="radio" >
						{/* Countries List */}
						<Box>
							<Menu closeOnSelect={false} >
								<MenuButton fontWeight="s" 
											textAlign="start" 
											paddingLeft={10} 
											w="full" 
											as={Button} 
											colorScheme='black' 
											variant='ghost'>
											{name[1]}
								</MenuButton>
								<MenuList height="15rem" overflowY="scroll">
									<VStack paddingLeft={5} 
											alignItems="flex-start">
										{error ? <Text>{error} <br /> :( </Text> : <CheckboxGroup  onChange={(e)=>{handleCountriesChange(e, name[1])}}   value={props.filterData[EfilterDataProp.Country]}>
											{countries.length !== 0 ? countries.map((country,i)=> 
											<Checkbox value= {country} > {country} </Checkbox>):<MenuItemOption > </MenuItemOption>}
										</CheckboxGroup>}
										
									</VStack>
								</MenuList>
							</Menu>
						</Box>
						

						{/* Cities List */}
						<Box>
							<Menu closeOnSelect={false} >
								<MenuButton fontWeight="s" 
											textAlign="start" 
											paddingLeft={10} 
											w="full" 
											as={Button} 
											colorScheme='black' 
											variant='ghost'>
											{name[0]}
								</MenuButton>
								<MenuList height="15rem" overflowY="scroll">
									<VStack paddingLeft={5} 
											alignItems="flex-start">
										<CheckboxGroup  onChange={(e)=>{handleCountriesChange(e, name[0])}}   value={props.filterData[EfilterDataProp.City]}>
											{cities.length !== 0 ? cities.map((city,i)=> 
											<Checkbox value= {city} > {city} </Checkbox>):<MenuItemOption > </MenuItemOption>}
										</CheckboxGroup>
									</VStack>
								</MenuList>
							</Menu>
						</Box>
						
						
					</MenuOptionGroup>
				</MenuList>
    		</Menu>
		</Box>
    
  );
}


export default MapsFilter;