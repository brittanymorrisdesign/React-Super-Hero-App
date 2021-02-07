import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,Input } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  heroesTable: {
    margin: '30px'
  },
  input: {
    width: 40,
  }
});

const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={e => onChange(e, row)}
            className={classes.input}
            type="number"
            inputProps={{ min: 0, max: 3}}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

export default function HeroesTable(props) {

  const [rows, setRows] = useState(props);
  const [searched, setSearched] = useState("");
  const [previous, setPrevious] = useState({});
  const classes = useStyles();

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.props.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.props.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.props.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };
  console.log(props)

  const onRevert = id => {
    const newRows = rows.props.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <div className={classes.heroesTable} >
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left" />
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Age</TableCell>
                <TableCell align='left'>Secret Identity</TableCell>
                <TableCell align='left'>Powers</TableCell>
                <TableCell align='left'>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {rows.props && rows.props.map(row => (
            <TableRow key={row.age}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>{row.age}</TableCell>
                  <TableCell align='left'>{row.secretIdentity}</TableCell>
                  <TableCell align='left'>{row.powers}</TableCell>
              <CustomTableCell align='left' {...{ row, name: "protein", onChange }} />
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
