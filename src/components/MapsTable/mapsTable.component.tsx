
import React from 'react'
import { IPropTypes } from './mapsTable.types';
import {TableContainer, Thead, Tbody, Tr, Th, Td, chakra, Table, Button } from '@chakra-ui/react';
import { useTable, useSortBy, useFlexLayout } from 'react-table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import MapProgressbar from '../MapProgressbar';
import "./mapsTable.modules.css"

function MapsTable(props: IPropTypes): JSX.Element {
	const data = React.useMemo(
		() => [
		  {
			placeName: 'The Grand Mayan',
			city: 'Puerto Vallarta, MX',
			progress: 10,
		  },
		  {
			placeName: 'Holiday Inn',
			city: 'Pachuca, MX',
			progress: 80,
		  },
		  {
			placeName: 'Hotel Lancelot',
			city: 'Rome, IT',
			progress: 45,
		  },
		  {
			placeName: 'The Grand Mayan',
			city: 'Puerto Vallarta, MX',
			progress: 100,
		  },
		  {
			placeName: 'Holiday Inn',
			city: 'Pachuca, MX',
			progress: 80,
		  },
		  {
			placeName: 'Hotel Lancelot',
			city: 'Rome, IT',
			progress: 45,
		  },
		  {
			placeName: 'The Grand Mayan',
			city: 'Puerto Vallarta, MX',
			progress: 25,
		  },
		  {
			placeName: 'Holiday Inn',
			city: 'Pachuca, MX',
			progress: 80,
		  },
		  {
			placeName: 'Hotel Lancelot',
			city: 'Rome, IT',
			progress: 45,
		  },
		  {
			placeName: 'The Grand Mayan',
			city: 'Puerto Vallarta, MX',
			progress: 25,
		  },
		  {
			placeName: 'Holiday Inn',
			city: 'Pachuca, MX',
			progress: 80,
		  },
		  {
			placeName: 'Hotel Lancelot',
			city: 'Rome, IT',
			progress: 45,
		  },
		],
		[]
	  )


	const columns = React.useMemo(
		() => [
			{
			Header: 'Place name',
			accessor: 'placeName',
			
			},
			{
			Header: 'City',
			accessor: 'city',
			},
			{
			Header: 'Mapping progress',
			accessor: 'progress',
			isNumeric: true,
			Cell: ({ cell: { value } }) => (
				<MapProgressbar progress = {value} showProgress={false}></MapProgressbar>
				)
			},
		],
		[]
	)

	const { getTableProps, 
			getTableBodyProps, 
			headerGroups, 
			rows, 
			prepareRow } = useTable({ columns, data }, useSortBy, useFlexLayout)
	
	return (
		<Table {...getTableProps()} size="md" w="full" display="grid" >
			<Thead >
				{headerGroups.map((headerGroup) => (
				<Tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column) => (
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
					{row.cells.map((cell) => (
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

export default MapsTable