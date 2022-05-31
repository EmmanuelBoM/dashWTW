import React from 'react'
import { IPropTypes } from './mapsTable.types';

import {Thead, Tbody, Tr, Th, Td, chakra, Table} from '@chakra-ui/react';
import { useTable, useSortBy, useFlexLayout, Column } from 'react-table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

import MapProgressbar from '../MapProgressbar';

import "./mapsTable.modules.css"
import { Link } from 'react-router-dom';
import {IData} from './mapsTable.types'

function MapsTable(props: IPropTypes): JSX.Element {
	const getTableProps= props.getTableProps 
	const getTableBodyProps= props.getTableBodyProps
	const headerGroups= props.headerGroups
	const rows= props.rows
	const prepareRow= props.prepareRow
	
	return (
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
	)
}

export default MapsTable