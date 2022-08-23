import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar';
import DataContainer from '../Components/DataContainer';
import SideNav from '../Components/SideNav';
import { io, Socket } from "socket.io-client";

function MainDisplay () {

  const [domain, setDomain] = useState(null);
  const [port, setPort] = useState(null);
  const [display, setDisplay] = useState(false);
  // const [connected, setConnected] = useState(false);
  const [underReplicated, setUnderReplicated] = useState({});
  const [activeControllers, setActiveControllers] = useState({});
  const [offlinePartitions, setOfflinePartitions] = useState({});



  function handlePortAndDomain(port, domain){
    console.log('inHandlePortAndDomain SOS')
    setDomain(domain);
    setPort(port);
    if (domain && port) {
      const socket = (io('ws://localhost:3500'));
      // socket.on("data", (data)=>{
      //   if(data) dispatch(connectAddress({ipaddress, port}));
      // });
      socket.emit("ip", `${domain}:${port}`);
      // setConnected(true);

      // socket.on('underReplicated', (data) =>{
      //   console.log("Here's your underRep data: ", data); //is an object with a metric property
      //   setUnderReplicated(data)
      // });
      // socket.on('activeControllers', (data) =>{
      //   console.log("Here's your activeCont data: ", data); //is an object with a metric property
      //   setActiveControllers(data)
      // });
      // socket.on('offlinePartitions', (data) =>{
      //   console.log("Here's your offPart data: ", data); //is an object with a metric property
      //   setOfflinePartitions(data)
      // });
      socket.onAny((metric, data) => {
        if (metric ==='underReplicated') setUnderReplicated(data);
        if (metric ==='offlinePartitions') setOfflinePartitions(data);
        if (metric ==='activeControllers') setActiveControllers(data);
      })
    }
  }

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

    // console.log('state offlinepart', offlinePartitions);
    // console.log('state activecont', activeControllers);
    // console.log('state underrep', underReplicated);


    // useEffect(()=>{
    // }, [underReplicated, offlinePartitions, activeControllers])
    
    // const dataProps={
    //   'underReplicated': underReplicated,
    //   'activeControllers': activeControllers,
    //   'offlinePartitions': offlinePartitions
    // }
    return (
        <>
            <Grid container sx={outerGridContainer}>
              <Box sx={{gridArea:"SideNav"}}>
                <SideNav handlePortAndDomain = {handlePortAndDomain}/>
              </Box>
              <Box sx={{ gridArea: "NavBar"}}>
                <NavBar />
              </Box>
              <Box sx={{gridArea:"DataContainer"}}>
                <DataContainer 
                  // connected={connected}
                  activeControllers={activeControllers} 
                  offlinePartitions={offlinePartitions}
                  underReplicated={underReplicated}
                />
                {/* <DataContainer props={ dataProps }/> */}
              </Box>
            </Grid>
        </>
    )
}

export default MainDisplay;

