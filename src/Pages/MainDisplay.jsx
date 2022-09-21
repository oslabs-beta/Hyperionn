import React,{useEffect, useContext, useState, createContext} from "react";
import { Grid, Box } from '@mui/material';
import NavBar from '../Components/NavBar';
import DataContainer from '../Components/DataContainer';
import SideNav from '../Components/SideNav';
import { io, Socket } from "socket.io-client";
import { Email } from "@mui/icons-material";

function MainDisplay () {

  const [domain, setDomain] = useState(null);
  const [port, setPort] = useState(null);
  const [display, setDisplay] = useState(false);
  const [underReplicated, setUnderReplicated] = useState({});
  const [activeControllers, setActiveControllers] = useState({});
  const [offlinePartitions, setOfflinePartitions] = useState({});
  const [avgReqLatency, setAvgReqLatency] = useState({});
  const [responseRate, setResponseRate] = useState({});
  const [requestRate, setRequestRate] = useState({});
  const [producerByteRate, setProducerByteRate] = useState({});
  const [bytesConsumedRate, setBytesConsumedRate] = useState({});
  const email = localStorage.getItem('email');

  function handlePortAndDomain(newdomain, newport){
    setDomain(newdomain);
    setPort(newport);
    setSocket()
  }

  function setSocket(){
    const domainLocal = localStorage.getItem('domain');
    const portLocal = localStorage.getItem('port');
    if (domainLocal && portLocal) {
      const socket = (io('ws://localhost:3500'));
      const ip = `${domainLocal}:${portLocal}`
      socket.emit("ip&email", ip, email);

      socket.onAny((metric, data) => {
        if (metric === 'underReplicated') setUnderReplicated(data);
        if (metric === 'offlinePartitions') setOfflinePartitions(data);
        if (metric === 'activeControllers') setActiveControllers(data);
        if (metric === 'avgReqLatency') setAvgReqLatency(data);
        if (metric === 'responseRate') setResponseRate(data);
        if (metric === 'requestRate') setRequestRate(data);
        if (metric === 'producerByteRate') setProducerByteRate(data);
        if (metric === 'bytesConsumedRate') setBytesConsumedRate(data);
      })
    }
  }
  

  useEffect(()=> {
    const domainLocal = localStorage.getItem('domain');
    const portLocal = localStorage.getItem('port');

    if (domainLocal && portLocal) {
      const socket = (io('ws://localhost:3500'));
      const ip = `${domainLocal}:${portLocal}`
      socket.emit("ip&email", ip, email);
      
      socket.onAny((metric, data) => {
        if (metric === 'underReplicated') setUnderReplicated(data);
        if (metric === 'offlinePartitions') setOfflinePartitions(data);
        if (metric === 'activeControllers') setActiveControllers(data);
        if (metric === 'avgReqLatency') setAvgReqLatency(data);
        if (metric === 'responseRate') setResponseRate(data);
        if (metric === 'requestRate') setRequestRate(data);
        if (metric === 'producerByteRate') setProducerByteRate(data);
        if (metric === 'bytesConsumedRate') setBytesConsumedRate(data);
      })
    }
  }, [])

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
                <SideNav handlePortAndDomain = {handlePortAndDomain} />
              </Box>
              <Box sx={{ gridArea: "NavBar"}}>
                <NavBar />
              </Box>
              <Box sx={{gridArea:"DataContainer"}}>
                <DataContainer 
                  activeControllers={activeControllers} 
                  offlinePartitions={offlinePartitions}
                  underReplicated={underReplicated}
                  avgReqLatency={avgReqLatency}
                  responseRate={responseRate}
                  requestRate={requestRate}
                  producerByteRate={producerByteRate}
                  bytesConsumedRate={bytesConsumedRate}
                />
              </Box>
            </Grid>
        </>
    )
}

export default MainDisplay;

