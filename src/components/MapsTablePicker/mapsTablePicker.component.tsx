import React, { useEffect, useState } from 'react'
import { IPropTypes } from './mapsTablePicker.types';

import {Thead, Tbody, Tr, Th, Td, chakra, Table} from '@chakra-ui/react';
import { useTable, useSortBy, useFlexLayout, Column } from 'react-table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

import MapProgressbar from '../MapProgressbar';

import "./mapsTablePicker.modules.css"
import { Link } from 'react-router-dom';
import {IData} from './mapsTablePicker.types'

// Imports axios
import axios from "axios"
import Error404 from '../../pages/Error404';


function MapsTable(props: IPropTypes): JSX.Element {
	const [ status, setStatus ] = useState<string>('loading');
	const [ error, setError ] = useState<any>(null);
	const [ maps, setMaps ] = useState<IData[]>([]);
	let data=maps;

	const columns: Column<IData>[] = React.useMemo(
		() => [
			{
			Header: "ID",
			accessor: "placeID",
			isVisible:false
			},

		  {
			Header: "Place name",
			accessor: "placeName",
			Cell: (props) => (
				<Link to={`/maps/${props.row.original.city}`}>{props.cell.value}</Link>
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
		axios.get(`http://localhost:9000/maps/table/${props.calendarStartDate}/${props.calendarEndDate}`) // Devuelve lista de mappers
		.then((result)=>{
		  setMaps(result.data)
		  setStatus('resolved')
		})
		.catch((error)=>{
		  setError(error)
		  setStatus('error')
		})
	},[props.calendarStartDate,
        props.calendarEndDate])

	const { getTableProps, 
			getTableBodyProps, 
			headerGroups, 
			rows, 
			prepareRow } = useTable({ columns, data, initialState: {hiddenColumns:["placeID"]} }, useSortBy, useFlexLayout,)
	
	if (status === "loading") {
		return(
			<h1>Loading...</h1>
		)
		}

	if (status === "error") {
	return (
			<Error404/>
		)
	}

	else {
		return (
			<Table {...getTableProps()} size="md" w="full" display="grid" >
				<Thead >
					{headerGroups.map((headerGroup) => (
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
					{rows.map((row) => {
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
		)
	}
}

export default MapsTable