import React, { useEffect, useState } from 'react'
import { IPropTypes } from './mapsTablePicker.types';

import {Thead, Tbody, Tr, Th, Td, chakra, Table, HStack, Input, InputGroup, InputLeftElement, VStack} from '@chakra-ui/react';
import { useTable, useSortBy, useFlexLayout, Column, useGlobalFilter } from 'react-table'
import { TriangleDownIcon, TriangleUpIcon, Search2Icon } from '@chakra-ui/icons'

import MapProgressbar from '../MapProgressbar';

import "./mapsTablePicker.modules.css"
import { Link } from 'react-router-dom';
import {IData} from './mapsTablePicker.types'

// Imports axios
import axios from "axios"
import Error404 from '../../pages/Error404';
import ErrorMessage from '../ErrorMessage';
import FilterMapsComp from '../FilterMapsComp';

function MapsTable(props: IPropTypes): JSX.Element {
	const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
	const [ maps, setMaps ] = useState<IData[]>([]);
	const [filterData, setFilterData] = useState<any>({cities:[], countries:[], filter:""});

	let data=maps;

	const columns: Column<IData>[] = React.useMemo(
		() => [
			{
			Header: "ID",
			accessor: "id",
			isVisible:false
			},

		  {
			Header: "Place name",
			accessor: "placeName",
			Cell: (props) => (
				<Link to={`/maps/${props.row.original.id}`}>{props.cell.value}</Link>
			  ),
		  },
		  {
			Header: "City",
			accessor: "city",
		  },
		  {
			Header: "Mapping progress",
			accessor: "progress",
			isNumeric: true,
			Cell: ({ cell: { value } }) => (
			  <MapProgressbar
				progress={value}
				showProgress={false}
			  ></MapProgressbar>
			),
		  },
		],
		[]
	  );
	
	useEffect(()=>{
		setStatus('loading')
		axios({
			method: 'post',
			url: `http://localhost:9000/maps/table/${props.calendarStartDate}/${props.calendarEndDate}`,
			data: filterData,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
		.then((result)=>{
			setMaps(result.data)
		  	setStatus('resolved')

		})
		.catch(error =>{
			setError(error)
		  setStatus('error')
		})
		
	},[props.calendarStartDate,
        props.calendarEndDate])

	const { getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		state,
		setGlobalFilter,
		rows, 
		prepareRow }:any = useTable({ columns, data, initialState: {hiddenColumns:["id"]}}, useFlexLayout, useGlobalFilter, useSortBy,)
	
	const { globalFilter } = state

	if (status === "loading") {
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
		return (
				<>
				<HStack width="full" justifyContent="space-between">
                      <InputGroup w="50%">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<Search2Icon zIndex="0" color="gray.300" />}
                        />
                        <Input
						 value={globalFilter || ''}
                          placeholder="Search"
                          borderColor="gray.400"
                          borderRadius="lg"
						  onChange={e=> setGlobalFilter(e.target.value)}
                        ></Input>
                      </InputGroup>

                      <FilterMapsComp filterData={filterData} setFilterData={setFilterData} setMaps={setMaps} setStatus={setStatus} setError={setError} calendarEndDate={props.calendarEndDate} calendarStartDate={props.calendarStartDate} tableType="picker" mapperId={0}></FilterMapsComp>
            	</HStack>
				{Object.entries(maps[0]).length === 0 ?<ErrorMessage error="No maps found :( " type="data"/> : <>
				
				<Table {...getTableProps()} size="md" w="full" display="grid" >
					<Thead >
						{headerGroups.map((headerGroup:any) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
							<Th
								{...column.getHeaderProps(column.getSortByToggleProps())}
								isNumeric={column.isNumeric}
								textTransform="none"
								letterSpacing="unset"
								fontSize="md"
								color="black.400"
							>
								{column.render('Header')}
								<chakra.span pl='4'>
								{column.isSorted ? (
									column.isSortedDesc ? (
									<TriangleDownIcon aria-label='sorted descending' />
									) : (
									<TriangleUpIcon aria-label='sorted ascending' />
									)
								) : null}
								</chakra.span>
							</Th>
							))}
						</Tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()} >
						{rows.map((row:any) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()} fontSize="sm">
							{row.cells.map((cell: any) => (
								<Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
								{cell.render('Cell')}
								</Td>
							))}
							</Tr>
						)
						})}
					</Tbody>
					</Table>
					</>
					}
					</>
			
			
		)
	}
}

export default MapsTable