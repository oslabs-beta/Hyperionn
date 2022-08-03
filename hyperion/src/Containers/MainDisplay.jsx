import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar.jsx';
export const InfoContext = createContext();
import DataContainer from './DataContainer.jsx'

export function MainDisplay () {
      
    // const [kafkaData, setKafkaData] = useState({
    //     numberOfActivePartitions : 0,
    //     numberOfActiveControllers : 0,
    //     underReplicatedPartitions : 0
    // })
    
    // useEffect(()=> {
    //   console.log('prefetch')
    //   const fetchData = async () => {
    //     const response = await fetch('/server/metrics');
    //     const data = await response.json()
    //     setKafkaData(data)
    //   }
    //   fetchData()
    //   .catch(console.log('error in fetchData' ))
    // },[])

    const outerGridContainer = {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "60px 1fr",
        height: "100vh",
        gap: "0px 0px",
        gridTemplateAreas: `
        "NavBar"
        "DataContainer"`
    };

    return (
        <>
           <Grid container sx={outerGridContainer}>
            {/* <InfoContext.Provider value={[kafkaData, setKafkaData]}> */}
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

