import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function createData(id, amount) {
  return { id, amount };
}

const rows = [
  createData(1, 159.0),
  createData(2, 237.0),
  createData(3, 262.0),
  createData(4, 305.0),
  createData(5, 356.0),
];

export default function App() {
  const classes = useStyles();
  const handleSubmit = (event) => {
    axios
      .post(
        `http://localhost:8080/interestRateCalculator/${event.target.amount}`
      )
      .then((response) => {
        createData(response.id, response.amount);
        getTableUpdate();
      });
  };

  const getTableUpdate = () => {
    axios.get('http://localhost:8080/interestAmount').then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div align="center">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" name="amount" placeholder="Amount" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Interest Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </header>
    </div>
  );
}
