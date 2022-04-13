import * as React from "react"
import {
	Button,	
	HStack,
	Menu,
	MenuList,
	MenuOptionGroup,
	VStack,
	CheckboxGroup,
	MenuButton,
	Checkbox,
	MenuItemOption
} from "@chakra-ui/react";

{/*F*/}

let paises:string[]=[
	"Albania​",
	"Alemania​​",
	"Andorra​",
	"Argentina​​​",
	"Austria",
	"Azerbaiyán",
	"Bielorrusia",
	"Bélgica"
];

let ciudades:string[]=[
	"Ámsterdam",
	"Manchester",
	"Copenhague",
	"Nueva York",
	"Montreal",
	"Praga",
	"Tel Aviv"
];

let name:string[]= ["City","Country"];

let perCity=(x:string[],name:string)=>(
	<Menu closeOnSelect={false} >
		<MenuButton fontWeight="s" textAlign="start" paddingLeft={10} w="full" as={Button} colorScheme='black' variant='ghost'>
			{name}
		</MenuButton>
		<MenuList>
			<VStack paddingLeft={5} alignItems="flex-start">
				<CheckboxGroup >
					{x.length !== 0 ? x.map((data,i)=> 
					<Checkbox value= {i.toString()} > {x[i]} </Checkbox>):<MenuItemOption > webos </MenuItemOption>}
				</CheckboxGroup>
			</VStack>
		</MenuList>
	</Menu>
)

function FilternSort(): JSX.Element {
	return(
		<HStack w={160} justifyContent="space-between" >
			<Menu closeOnSelect={false} >
				<MenuButton as={Button} w="full" colorScheme='black' variant='ghost'>
					Sort
				</MenuButton>
				<MenuList>
					<MenuOptionGroup defaultValue='0' title='Sort by' color="#2F6FE4" type='radio'>
						<MenuItemOption value='1'>Latest Sign In</MenuItemOption>
						<MenuItemOption value='2'>Oldest Sign In</MenuItemOption>
						<MenuItemOption value='3'>Completed maps (Asc.)</MenuItemOption>
						<MenuItemOption value='4'>Completed maps (Desc.)</MenuItemOption>
						<MenuItemOption value='5'>Maps in progress (Asc.)</MenuItemOption>
						<MenuItemOption value='6'>Maps in progress (Desc.)</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>

			<Menu closeOnSelect={false}>
				<MenuButton as={Button} w="full" colorScheme='black' variant='ghost'>
					Filter
				</MenuButton>
				<MenuList>
				<MenuOptionGroup defaultValue='0' type='radio'>
					{perCity(ciudades,name[0])}
					{perCity(paises,name[1])}
				</MenuOptionGroup>
				</MenuList>
			</Menu>	
		</HStack>
	)
}

export default FilternSort;