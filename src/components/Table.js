import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import EditIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Input,
} from '@material-ui/core'

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	heroesTable: {
		margin: '30px',
	},
	input: {
		width: 40,
	},
})

const CustomTableCell = ({ row, quantity, onChange }) => {
	const classes = useStyles()
	const { isEditMode } = row
	return (
		<TableCell align='left' className={classes.tableCell}>
			{isEditMode ? (
				<Input
					value={row[quantity]}
					name={quantity}
					onChange={e => onChange(e, row)}
					className={classes.input}
					type='number'
					inputProps={{ min: 0, max: 10 }}
				/>
			) : (
				row[quantity]
			)}
		</TableCell>
	)
}

export default function HeroesTable({ superHeroData }) {
	const [rows, setRows] = useState()
	const [searched, setSearched] = useState('')
	const [previous, setPrevious] = useState({})
	const classes = useStyles()

	// Add Quantity
	superHeroData.forEach(function(q) {
		q.quantity = 0
	})

	useEffect(() => {
		superHeroData && setRows(superHeroData)
	}, [superHeroData])

	const requestSearch = searchedVal => {
		const filteredRows =
			rows.props &&
			rows.props.filter(row => {
				return row.name.toLowerCase().includes(searchedVal.toLowerCase())
			})

		setRows(filteredRows)
	}

	const cancelSearch = () => {
		setSearched('')
		requestSearch(searched)
	}

	const onToggleEditMode = name => {
		setRows(state => {
			return rows.map(row => {
				if (row.name === name) {
					return { ...row, isEditMode: !row.isEditMode }
				}
				return row
			})
		})
	}

	const onChange = (e, row) => {
		if (!previous[row.name]) {
			setPrevious(state => ({ ...state, [row.name]: row }))
		}
		const value = e.target.value
		const name = e.target.name
		const { id } = row
		debugger
		const newRows = rows.map(row => {
			if (row.name === id) {
				return { ...row, [name]: value }
			}
			return row
		})
		setRows(newRows)
	}

	const onRevert = name => {
		const newRows = rows.map(row => {
			if (row.name === name) {
				return previous[name] ? previous[name] : row
			}
			return row
		})
		setRows(newRows)
		setPrevious(state => {
			delete state[name]
			return state
		})
		onToggleEditMode(name)
	}

	return (
		<div className={classes.heroesTable}>
			<Paper>
				<SearchBar
					value={searched}
					onChange={searchVal => requestSearch(searchVal)}
					onCancelSearch={() => cancelSearch()}
				/>
				<TableContainer>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='left' />
								<TableCell align='left'>Name</TableCell>
								<TableCell align='left'>Age</TableCell>
								<TableCell align='left'>Secret Identity</TableCell>
								<TableCell align='left'>Powers</TableCell>
								<TableCell align='left'>Quantity</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows &&
								rows.map(row => (
									<TableRow key={row.age}>
										<TableCell className={classes.selectTableCell}>
											{row.isEditMode ? (
												<>
													<IconButton
														aria-label='done'
														onClick={() => onToggleEditMode(row.name)}
													>
														<DoneIcon />
													</IconButton>
													<IconButton
														aria-label='revert'
														onClick={() => onRevert(row.name)}
													>
														<RevertIcon />
													</IconButton>
												</>
											) : (
												<IconButton
													aria-label='delete'
													onClick={() => onToggleEditMode(row.name)}
												>
													<EditIcon />
												</IconButton>
											)}
										</TableCell>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell component='th' scope='row'>
											{row.age}
										</TableCell>
										<TableCell component='th' scope='row'>
											{row.secretIdentity}
										</TableCell>
										<TableCell component='th' scope='row'>
											{Object.values(row.powers).join(', ')}
										</TableCell>
										<CustomTableCell
											align='left'
											{...{ row, name: 'quantity', onChange }}
										/>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	)
}
