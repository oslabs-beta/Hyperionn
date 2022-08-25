import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';

const columns = [
  { field: 'error_id', headerName: 'Error ID' },
  { field: 'instance', headerName: 'Instance' },
  { field: 'env', headerName: 'Environment' },
  {
    field: 'value',
    headerName: 'Value',
    type: 'number'
  },
  { field: 'name', headerName: 'Name' },
  { field: 'time', headerName: 'Time' }
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const rows = [];

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
        email: ''
      }
    ]
  );

  useEffect(()=> {
    // make Initial Fetch on Component Did Mount that returns the data that will be passed into makeDataSets function
    // if (!errorData.length) {
      getErrorData();
      console.log('state errorData in useEffect: ', errorData)
    // }
      //processErrorData(errorData);
  }, [])

  
  const getErrorData = async () => {
    
    const email = localStorage.getItem('email');
    console.log('email in geterror fetch request front end: ', email);
    const result = await axios.post('/server/errors', { email })
    console.log('get request result.data', result.data);
    setErrorData(result.data);
    console.log('updated errorData in get error data', errorData)
  }

  
  const processErrorData = (errorDataParam) => {
     
    //console.log('errorData in process error data', errorDataParam);
    // errorDataParam.map(el => {
    //   console.log('element in errorData.map', el)
    //   let newEl = {
    //     error_id: el.error_id,
    //     instance: el.instance,
    //     env: el.env,
    //     value: el.value,
    //     name: el.name,
    //     time: el.time
    //   }
    //   console.log('newEl', newEl);
    //   rows.push(newEl);
    // })
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
    // <div style={{ height: 400, width: '100%' }}>
    //    <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     pageSize={5}
    //     rowsPerPageOptions={[5]}
    //     checkboxSelection
    //   />
    // </div>
  );
}
