import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar';
import DataContainer from '../Components/DataContainer';
import SideNav from '../Components/SideNav';

export function MainDisplay () {

  const [display, setDisplay] = useState(false);

    const outerGridContainer = {
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gridTemplateRows: "60px 1fr",
        height: "80vh",
        gap: "0px 0px",
        gridTemplateAreas: `
        "SideNav NavBar"
        "SideNav DataContainer"`
    };

    return (
        <>
            <Grid container sx={outerGridContainer}>
              <Box sx={{gridArea:"SideNav"}}>
                <SideNav />
              </Box>
              <Box sx={{ gridArea: "NavBar"}}>
                <NavBar />
              </Box>
              <Box sx={{gridArea:"DataContainer"}}>
                <DataContainer />
              </Box>
            </Grid>
        </>
    )
}

export default MainDisplay;
