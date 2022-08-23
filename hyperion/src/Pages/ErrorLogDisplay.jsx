import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar';
//import SideNav from '../Components/SideNav';
import ErrorLogContainer from '../Components/ErrorLogContainer';

export function ErrorLogDisplay () {

    const [loggedIn, setLoggedIn] = useState(true);
  
      const outerGridContainer = {
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gridTemplateRows: "60px 1fr",
          height: "80vh",
          gap: "0px 0px",
          gridTemplateAreas: `
          "SideNav NavBar"
          "SideNav ErrorLogContainer"`
      };
  
      return (
          <>
            <Grid container sx={outerGridContainer}>
              {/* <InfoContext.Provider value={[kafkaData, setKafkaData]}> */}
                <Box sx={{gridArea:"SideNav"}}>
                  {/* <SideNav /> */}
                </Box>
                <Box item sx={{ gridArea: "NavBar"}}>
                  <NavBar />
                </Box>
                {/* <Box item sx={{gridArea:"ErrorLogContainer"}}>
                  <ErrorLogContainer />
                </Box> */}
              {/* </InfoContext.Provider> */}
            </Grid>
          </>
      )
  }
  
  export default ErrorLogDisplay;