import * as React from "react" 

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
	VStack
} from "@chakra-ui/react";

// Vars containing strings of countries and cities
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
		<MenuButton fontWeight="s" 
		            textAlign="start" 
					paddingLeft={10} 
					w="full" 
					as={Button} 
					colorScheme='black' 
					variant='ghost'>
			{name}
		</MenuButton>
		<MenuList>
			<VStack paddingLeft={5} 
			        alignItems="flex-start">
				<CheckboxGroup >
					{x.length !== 0 ? x.map((data,i)=> 
					<Checkbox value= {i.toString()} > {x[i]} </Checkbox>):<MenuItemOption > webos </MenuItemOption>}
				</CheckboxGroup>
			</VStack>
		</MenuList>
	</Menu>
)

function MapsFilter(): JSX.Element {
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
      <MenuList p={4}>
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

        <MenuOptionGroup defaultValue="0" type="radio">
          {perCity(ciudades, name[0])}
          {perCity(paises, name[1])}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default MapsFilter;