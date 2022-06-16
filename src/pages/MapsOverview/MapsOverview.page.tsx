// Importing i18n-iso-countries library to obtain countries' ISO code
import * as i18nIsoCountries from 'i18n-iso-countries';

import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

// Imports from d3-scale
import { scaleLinear } from "d3-scale";

// Imports axios
import axios from "axios"

// Importing moment library to parse dates
import moment from "moment";

// Imports from Chakra UI
import {
  Container,
  Flex,
  Heading,
  Box,
  Text,
  Wrap,
  VStack,
  HStack,
  Grid,
  GridItem,
  StackDivider,
  Divider,
  Stack,
} from "@chakra-ui/react"

// Imports of custom components
import CalendarDatePicker from '../../components/CalendarDatePicker/CalendarDatePicker.component';
import SummaryOnDatePicking from "../../components/SummaryOnDatePicking";
import ErrorMessage from '../../components/ErrorMessage';

// Imports of icons from wtw icons
import BuildingEntrance from 'wtw-icons/_icons/Buildingentrance'
import Lobby from 'wtw-icons/_icons/Lobby'
import FoodService from 'wtw-icons/_icons/FoodService'
import SwimmingPool from 'wtw-icons/_icons/SwimmingPool'
import QueenBed from 'wtw-icons/_icons/QueenBed'
import GeneralAttribute from 'wtw-icons/_icons/GeneralAttribute'
import Bathroom from 'wtw-icons/_icons/Bathroom'
import Elevator from 'wtw-icons/_icons/Elevator'
import Gym from 'wtw-icons/_icons/Gym'
import Beachfront from 'wtw-icons/_icons/Beachfront'
import Parking from 'wtw-icons/_icons/Parking'
import Other from 'wtw-icons/_icons/Other'
import Countries from 'wtw-icons/_icons/Countries'; 
import Destinations from 'wtw-icons/_icons/Destinations'; 
import CloseButton from 'wtw-icons/_icons/CloseButton';

// Importing react-router-dom library
import { useNavigate } from "react-router-dom";

// Imports of Map Items from React Simple Maps
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

// Imports of charts from React Google Charts
import { Chart } from "react-google-charts";

import MapsTablePicker from '../../components/MapsTablePicker';
import { IPropTypes } from './MapsOverview.types';
import { setUserToken } from '../../utils/axios';


// Require for parsing the country codes
i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// VARS-------------------------------------------------------------

// Username
let username:string = 'Arturo Gaona'

// Arrays of existing areas into the AMS
let areasAMS:any[] = [["Building Entrance", <BuildingEntrance width="1.6em" height="1.6em"/>, "buildingentrance"],
                      ["Lobby Reception", <Lobby width="1.6em" height="1.6em"/>, "lobbyreception"],
                      ["Rooms", <QueenBed width="1.6em" height="1.6em"/>, "rooms"],
                      ["Room One", <QueenBed width="1.6em" height="1.6em"/>, "rooms_one"],
                      ["Room Two", <QueenBed width="1.6em" height="1.6em"/>, "rooms_two"],
                      ["Room Three", <QueenBed width="1.6em" height="1.6em"/>, "rooms_three"],
                      ["General Accessibility", <GeneralAttribute width="1.6em" height="1.6em"/>, "generalaccessibility"],
                      ["Food Service Area", <FoodService width="1.6em" height="1.6em"/>, "foodservice"],
                      ["Swimming Pool", <SwimmingPool width="1.6em" height="1.6em"/>, "swimmingpool"],
                      ["Fitness Center", <Gym width="1.6em" height="1.6em"/>, "fitnesscenter"],
                      ["Beachfront", <Beachfront width="1.6em" height="1.6em"/>, "beachfront"],
                      ["Parking Area", <Parking width="1.6em" height="1.6em"/>, "parkingarea"],
                      ["Common Area Toilet", <Bathroom width="1.6em" height="1.6em"/>, "commonareatoilet"],
                      ["Other Areas", <Other width="1.6em" height="1.6em"/>, "other_areas"],
                      ["Elevator", <Elevator width="1.6em" height="1.6em"/>, "elevator"],
                      ["No Area Available", <CloseButton width="1.6em" height="1.6em"/>, "unavailable"]]                        

// Data of map
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// Options of bar chart
const options = {
  title: "Listing Highlights",
  width: 350,
  height: 500,
  fontName: "Lato",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

// enum of Typescript
enum MonthsOfTheYear {
  "Jan" = 1,
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
}

// Options of line chart
const optionsLineChart = {
  curveType: "function",
  fontName: "Lato",
  legend: { position: "bottom" },
};

export const MapsOverview = (props:IPropTypes) => {

  const [ calendarStartDate, setCalendarStartDate ] = useState<any>(moment().startOf("month").format("YYYY-MM-DD"))
  const [ calendarEndDate, setCalendarEndDate ] = useState<any>(moment().format("YYYY-MM-DD"))
  const [ datePickerSelection, setDatePickerSelection ] = useState<string>("This Month")
  const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
  const [ mapsOverviewData, setMapsOverviewData ] = useState<any>(null);
  const [ iconsTextLeastMappedAreas,setIconsTextLeastMappedAreas ] = useState<any>([]);
  const [ tooltipContent, setTooltipContent ] = useState<string>('')
  const [ dataMap, setDataMap ] = useState<any>([])
  const [ provisionalLMAreas, setProvisionalLMAreas] = useState<any>('')
  const [ data, setData ] = useState<any>([
    [
      "Element",
      "Maps",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ]
  ]);

  const [ dataLineChart, setDataLineChart ] = useState<any>([
    ["Month", "Maps"],
  ]);
  const [ highestNumberOfMaps, setHighestNumberOfMaps ] = useState<number>(0)
  const [ isHeaderLoading, setIsHeaderLoading ] = useState(true);

  const setHeader = async(user:any) => {
    setIsHeaderLoading(true)

    try {
      const token = await user.getIdToken();
      setUserToken(token)
    } catch (error) {
      console.log(error)
    }
    setIsHeaderLoading(false)
    
  }

  let navigate = useNavigate();

  useEffect(()=>{
    setStatus('loading')
    props.setSelectedWindow('ams')
    if(!props.loading && !props.user) {
      navigate("/")
    } else {
      axios.get(`https://apidash2.herokuapp.com/maps/overview/${calendarStartDate}/${calendarEndDate}`) // Devuelve data de mapsOverview
          .then((result)=>{
            setMapsOverviewData(result.data)
            setStatus('resolved')
            result.data.allTimeStatistics.highlights.map((item:any) => {
              if (data.length > result.data.allTimeStatistics.highlights.length + 0.5) {
                setData(data)
              } else {
                  data.push([item.country_name, item.cantidad, "#FF7562", item.cantidad])
                }
              }
            )
            setHighestNumberOfMaps(parseInt(result.data.allTimeStatistics.highlights[0].cantidad))
            setIconsTextLeastMappedAreas(areasAMS.filter( (area) => { for(let i = 0; i < result.data.allTimeStatistics.leastMappedAreas.length; i++) if (result.data.allTimeStatistics.leastMappedAreas[i].inquiry_id === area[2]) return true}))
            setProvisionalLMAreas(result.data.allTimeStatistics.leastMappedAreas)
            result.data.allTimeStatistics.worldwideInsights.map((item:any) => {
              dataMap.push([i18nIsoCountries.getAlpha3Code(item.country_name, "en"), item.cantidad])
            })
            result.data.allTimeStatistics.worldwideInsights.map((item:any) => {
              dataMap.push([i18nIsoCountries.getAlpha3Code(item.country_name, "en"), item.cantidad])
            })
            result.data.allTimeStatistics.completedAMSMaps.map((item:any) => {
              if (dataLineChart.length > result.data.allTimeStatistics.completedAMSMaps.length + 0.5) {
                setDataLineChart(dataLineChart)
              } else {
                  let axisTag:string = `${MonthsOfTheYear[item.mes]} ${item.año}`
                  dataLineChart.push([axisTag, item.cant])
                }
              }
            )
          })
          .catch((error)=>{
            setError(error)
            setStatus('error')
          })}

    if(props.user){
      setHeader(props.user);
    }
  }, [props.user, props.loading])

  if (status === "loading" || provisionalLMAreas === '' ) {
    return(
      <h1>Loading...</h1>
    )
  }

  if (status === "error") {
    return (
			<>
			  {error.message === "Request failed with status code 404" ? <ErrorMessage error="No results found :(" type="data"/>  : <ErrorMessage error="Woops! Something went wrong" type="general"/>  }
		  </>
		)
  }

  else {
    return(
      <Container maxWidth="container.xxl" bgColor="#F8F9FD">
        <Flex
          h="full"
          p="7% 20% 5% 15%"
          marginLeft="3vw"
          direction={{ base: "column", md: "row" }}
        >
          <VStack spacing={10}>
            <HStack w="70vw" justifyContent="space-between" marginBottom={10}>

              <VStack alignItems="flex-start">
                <Box>
                  <Heading fontSize="1.5em" color="blue.600">
                  {props.user ? `Welcome, ${props.user?.displayName}` : ""}
                  </Heading>
                </Box>
                <Heading size="xl">AMS Maps Overview</Heading>
              </VStack>

              <VStack alignItems="flex-start" w="33vw">
                <Text color="black.600">View statistics by:</Text>
                <CalendarDatePicker 
                  setCalendarStartDate={setCalendarStartDate} 
                  setCalendarEndDate={setCalendarEndDate}
                  setDatePickerSelection={setDatePickerSelection}
                   />
              </VStack>
            </HStack>

            <VStack spacing={6} w="full">
              {/* /Summary Card */}
              <SummaryOnDatePicking calendarStartDate={calendarStartDate} 
                                    calendarEndDate={calendarEndDate} 
                                    datePickerSelection={datePickerSelection}
              />

              {/* /All Maps Table Card */}
              <VStack
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  w="100%"
                  borderRadius="lg"
                  borderColor="black.200"
                  spacing={8}
                  bgColor="#FFF"
                >
                  <HStack justifyContent="space-between" w="100%">
                    <VStack>
                      <Heading fontSize="xl">All Maps</Heading>
                      <Text color="black.400" marginBottom="1.5vw">
                        {datePickerSelection}
                      </Text>
                    </VStack>
                    
                  </HStack>

                  <MapsTablePicker calendarStartDate={calendarStartDate} calendarEndDate={calendarEndDate}></MapsTablePicker>
              </VStack>
            </VStack>
            
            
            <VStack spacing={6} w="full">
              
              <HStack w="full">
                <Grid
                  column={3}
                  columnGap={3}
                  rowGap={3}
                  w="full"
                  h="3vw"
                  marginTop="3vw"
                  color="black.main"
                >
                  <GridItem colSpan={2} bg="blue.main" h="4px" marginTop="0.7vw">
                    <HStack
                      width="full"
                      height="0.9em"
                      borderWidth="1px"
                      borderColor="transparent"
                      borderBottomColor="white"
                    ></HStack>
                  </GridItem>
                  <GridItem colSpan={1} textAlign="center" paddingTop={0}>
                    <Heading fontSize="xl">All Time Statistics</Heading>
                  </GridItem>
                  <GridItem
                    colStart={4}
                    colEnd={6}
                    bg="blue.main"
                    h="4px"
                    marginTop="0.7vw"
                  >
                    <HStack
                      width="full"
                      height="0.9em"
                      borderWidth="1px"
                      borderColor="transparent"
                      borderBottomColor="white"
                    ></HStack>
                  </GridItem>
                </Grid>
              </HStack>

              {/* /Worldwide Insights Card */}
              <VStack
                p={5}
                shadow="md"
                borderWidth="1px"
                w="full"
                borderRadius="lg"
                borderColor="black.200"
                bgColor="#FFF"
                alignItems="start"
                spacing={4}
              >
                <HStack justifyContent="space-between" w="100%">
                    <VStack alignItems="flex-start">
                      <Heading fontSize="xl">Worldwide Maps</Heading>
                      <Text color="black.400" marginBottom="1.5vw" width="50vw">
                        Zoom and Pan
                      </Text>
                    </VStack>
                </HStack>
                
                <HStack justifyContent="space-evenly">
                  <ReactTooltip>{tooltipContent}</ReactTooltip>
                  <Wrap borderRadius="lg" w="40vw" h="auto" textAlign="center">
                    <ComposableMap
                      projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
                      data-tip={tooltipContent}
                    >
                      <ZoomableGroup zoom={1}>
                        <Sphere
                          id="1"
                          fill="transparent"
                          stroke="#E4E5E6"
                          strokeWidth={0.5}
                        />
                        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                        <Geographies geography={geoUrl}>
                          {({ geographies }) =>
                            geographies.map((geo:any) => {
                              const d:any[] = dataMap.find((s:any[]) => s[0] === geo.properties.ISO_A3);
                              const colours:any[] = ["#ffedea", "#ff5233"]
                              const colorScale = scaleLinear()
                                .domain([0, highestNumberOfMaps])
                                .range(colours)
                              let colourToBeUsed:string = colorScale(d? d[1]: 0).toString()
                              return (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  onMouseEnter={() => {
                                    const { NAME, ISO_A3 } = geo.properties;
                                    let countryHovered = dataMap.find((item:any[]) => ISO_A3 === item[0])
                                    setTooltipContent(`${NAME} - ${countryHovered[1]} maps`)
                                  }}
                                  onMouseLeave={() => {
                                    setTooltipContent("");
                                  }}
                                  fill={d ? colourToBeUsed : "#F5F4F6"}
                                />
                                );
                              })
                            }
                        </Geographies>
                      </ZoomableGroup>
                    </ComposableMap>
                  </Wrap>
                  <Box h="auto" textAlign="center" w="auto">
                    <Chart
                      chartType="BarChart"
                      width="100%"
                      height="100%"
                      data={data}
                      options={options}
                    />
                  </Box>
                </HStack>
                
                <VStack w="full">
                  <Divider
                    w="85%"
                    border="2px solid"
                    borderColor="lightgray.main"
                    borderRadius="full"
                    orientation="horizontal"
                    bgColor="lightgray.main"
                  />
                </VStack>
                

                <VStack w="full">
                  <Heading fontSize="xl">Worldwide Presence</Heading>
                  <HStack w="full" justifyContent="space-around">
                    <VStack spacing={-2}>
                      <HStack spacing={4}>
                        <Countries width="3em" color="#2f6fe4"></Countries>
                        <Text color="blue.main" fontWeight="600" fontSize="xl" textAlign="center">Number of <br /> Countries</Text>
                      </HStack>
                      <Text fontWeight="600" fontSize="3xl">{mapsOverviewData.allTimeStatistics.presence.countryNumber}</Text>
                    </VStack>
                    <VStack spacing={-2}>
                      <HStack spacing={4}>
                        <Destinations width="3em" color="#2f6fe4"></Destinations>
                        <Text color="blue.main" fontWeight="600" fontSize="xl" textAlign="center">Number of <br /> Destinations</Text>
                      </HStack>
                      <Text fontWeight="600" fontSize="3xl">{mapsOverviewData.allTimeStatistics.presence.destinationNumber}</Text>
                    </VStack>
                  </HStack>
                </VStack>
                

              </VStack>

              <HStack
                spacing={4}
                textAlign="center"
                marginBottom="6vw"
                alignItems="start"
                height="15%"
                width="100%"
                justifyContent="space-evenly"
              >
                <Box
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  w="22vw"
                  borderRadius="lg"
                  borderColor="black.200"
                  bgColor="#FFF"
                  height="100%"
                >
                  <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                    Average number of photos per map
                  </Heading>
                  <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                    <Text
                      fontSize="2em"
                      color="black.800"
                      fontWeight="bold"
                    >
                      {mapsOverviewData.allTimeStatistics.avgNumberOfPhotos}
                    </Text>
                    <Text color="black.800" marginBottom="1.5vw">
                      Photos
                    </Text>
                  </Box>
                </Box>

                <Stack divider={<StackDivider borderColor="black.200" />}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    w="22vw"
                    borderRadius="lg"
                    borderColor="black.200"
                    bgColor="#FFF"
                    height="100%"
                    justify='space-around'>
                  <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                    Least Mapped Areas
                  </Heading>
                  <VStack
                    divider={<StackDivider borderColor="black.200" />}
                    p={2}
                    w="100%"
                    height="100%"
                    justify='space-around'
                  >
                    {iconsTextLeastMappedAreas.map((area: any) => (
                      <Box color="black.800" display='inline-flex' justifyContent='space-around'>
                        <span>
                          {area[1]}
                        </span>
                        <Text marginLeft='0.7em'>
                          {area[0]}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Stack>

                <Box
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  w="22vw"
                  borderRadius="lg"
                  borderColor="black.200"
                  bgColor="#FFF"
                  height="100%"
                >
                  <Heading fontSize="xl" color="blue.main" fontWeight="bold">
                    Average completion time per map
                  </Heading>
                  <Box display='flex' height='100%' flexDirection='column' justifyContent='center'>
                    <Text
                      fontSize="2em"
                      color="black.800"
                      fontWeight="bold"
                    >
                      {mapsOverviewData.allTimeStatistics.avgTimeCompletionPerMap}
                    </Text>
                    <Text color="black.800" marginBottom="1.5vw">
                      Days
                    </Text>
                  </Box>
                </Box>
              </HStack>

              <Box
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  w="100%"
                  borderRadius="lg"
                  borderColor="black.200"
                  bgColor="#FFF"
                >
                  <Heading fontSize="xl">History: Completed AMS Maps</Heading>
                  <Text color="black.400" marginBottom="1.5vw">
                    This Year
                  </Text>
                  <HStack justifyContent="space-evenly">
                    <Box w="full" h="25vw" textAlign="center">
                      <Chart
                        chartType="LineChart"
                        width="100%"
                        height="100%"
                        data={dataLineChart}
                        options={optionsLineChart}
                      />
                    </Box>
                  </HStack>
              </Box>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    )
  }
};

export default MapsOverview;