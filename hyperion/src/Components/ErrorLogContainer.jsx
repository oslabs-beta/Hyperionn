import React, { useState, useRef, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function ErrorLogContainer() {

  const [errorData, setErrorData] = useState(
    [
      {
        error_id: '',
        instance: '',
        env: '',
        value: '',
        name: '',
        time: '',
        user_id: ''
      }
    ]
  );

  useEffect(()=> {
    // make Initial Fetch on Component Did Mount that returns the data that will be passed into makeDataSets function
    getErrorData();

  }, [])

  
  const getErrorData = async () => {
    
    const email = localStorage.getItem('email');
    console.log('email in geterror fetch request front end: ', email);
    const result = await axios.post('/server/errors', { email })
    console.log('get request', result);
    setErrorData(result.data);
  }



  //console.log('setError state', errorData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Error ID</TableCell>
            <TableCell align="right">Instance</TableCell>
            <TableCell align="right">Environment</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{errorData.map((row) => (
          <TableRow key={row.error_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{row.error_id}</TableCell>
            <TableCell align="right">{row.instance}</TableCell>
            <TableCell align="right">{row.env}</TableCell>
            <TableCell align="right">{row.value}</TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.time}</TableCell>
          </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
