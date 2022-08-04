import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar.jsx';
export const InfoContext = createContext();
import DataContainer from './DataContainer.jsx';
import SideNav from '../Components/SideNav.jsx';

export function MainDisplay () {

    const outerGridContainer = {
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gridTemplateRows: "60px 1fr",
        height: "90vh",
        gap: "0px 0px",
        gridTemplateAreas: `
        "SideNav NavBar"
        "SideNav DataContainer"`
    };

    return (
        <>
          <Grid container sx={outerGridContainer}>
            {/* <InfoContext.Provider value={[kafkaData, setKafkaData]}> */}
            <Box sx={{gridArea:"SideNav", backgroundColor: "#63489b"}}>
                <SideNav />
            </Box>
            <Box item sx={{ gridArea: "NavBar"}}>
              <NavBar />
            </Box>
            <Box item sx={{gridArea:"DataContainer"}}>
              <DataContainer />
            </Box>
            {/* </InfoContext.Provider> */}
          </Grid> 
        </>
    )
}

export default MainDisplay;

