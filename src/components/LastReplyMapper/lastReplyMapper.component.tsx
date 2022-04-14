import * as React from "react"
import {
	VStack,
	HStack,
	Stack,
	AspectRatio,
	Image,
	Heading,
	Text,
	Divider,
} from "@chakra-ui/react";

{/*T*/}
function LastRepCard(): JSX.Element {
	return(
		<Stack 
		h={400}
		w={300}
		alignItems="center"
		bg="white"
		borderRadius="lg"
		spacing={5}
		p={2}
		textAlign="center"
		>
			<VStack marginTop={5} p={1} color="#2F6FE4">
				<Heading  size="md">Last Reply</Heading>
				<Heading fontWeight="semibold" size="md">Date and Hour</Heading>
				<Heading size="lg" color="black">1</Heading>
				<Text color="black">May, 2018</Text>
				<Text color="gray.400">11:24 PM</Text>			
			</VStack>			

			<Divider h={.3} w={245} style={{ background: 'gray' }}  />

			<VStack p={1} color="#2F6FE4">
				<Heading size="md">Last Reply</Heading>
				<Heading fontWeight="semibold" size="md">Completed Area</Heading>
				<HStack p={1}>
					<AspectRatio ratio={1} w={19}>
						<Image src="http://purepng.com/public/uploads/large/purepng.com-sitting-catcatcatsanimalspetscute-cat-25152016380020k8o.png" alt="cat picture" />
					</AspectRatio>
					<Heading size="md" color="black">Rooms</Heading>
				</HStack>
				<Text color="black">
					Coco Mágico Resort, Los Cabos <br/>MX
				</Text>
			</VStack>	
		</Stack>
	)
}

export default LastRepCard;