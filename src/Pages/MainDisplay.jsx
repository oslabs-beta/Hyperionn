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
  // const [connected, setConnected] = useState(false);
  const [underReplicated, setUnderReplicated] = useState({});
  const [activeControllers, setActiveControllers] = useState({});
  const [offlinePartitions, setOfflinePartitions] = useState({});
  const [avgReqLatency, setAvgReqLatency] = useState({});
  const [responseRate, setResponseRate] = useState({});
  const [requestRate, setRequestRate] = useState({});
  const [producerByteRate, setProducerByteRate] = useState({});
  const [bytesConsumedRate, setBytesConsumedRate] = useState({});
  // const [avgDataSets, setAvgDataSets] = useState([]);
  const email = localStorage.getItem('email');

  function handlePortAndDomain(newdomain, newport){
    // const domainLocal = localStorage.getItem('domain');
    // const portLocal = localStorage.getItem('port');
    //To implement: display a message for a user that they have a port connected already, if the if statement is truthy
    // if (domainLocal === domain && portLocal === port) return; //this will avoid making duplicate sockets for already existing domain port
    //To implement: we need logic for closing old sockets when user connects a brand new port 
    console.log('inHandlePortAndDomain SOS')
    console.log('domainLocal: ', newdomain)
    console.log('portLocal: ', newport)
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
      // if (JSON.stringify(avgReqLatency) !== '{}'){
      //   makeDataSets(avgReqLatency)
      // }
    }
  }
  
  // function handlePortAndDomain(newPort, newDomain){
  //   const domainLocal = localStorage.getItem('domain'); //old domain in storage
  //   const portLocal = localStorage.getItem('port'); //old port in storage
  //   //To implement: display a message for a user that they have a port connected already, if the if statement is truthy
  //   if (domainLocal === domain && portLocal === port) return; //this will avoid making duplicate sockets for already existing domain port
  //   //To implement: we need logic for closing old sockets when user connects a brand new port 
  //   console.log('inHandlePortAndDomain SOS')
  //   if ((!domain && !port) || (domain !== newdomain && port !== newPort)) {
  //     setDomain(newDomain);
  //     setPort(newPort);
  //     startSocket()
  //   }
  // }
  
  // // function stopSocket(){
  // //   socket.removeAllListeners()
  // //   socket.off("ip&email")
  // // }
  // function startSocket(domain, port) {
  //   if (domain && port) {
  //     const socket = (io('ws://localhost:3500'));
  //     const ip = `${domain}:${port}`
  //     socket.emit("ip&email", ip, email);

  //     socket.onAny((metric, data) => {
  //       if (metric === 'underReplicated') setUnderReplicated(data);
  //       if (metric === 'offlinePartitions') setOfflinePartitions(data);
  //       if (metric === 'activeControllers') setActiveControllers(data);
  //       if (metric === 'avgReqLatency') setAvgReqLatency(data);
  //       if (metric === 'responseRate') setResponseRate(data);
  //       if (metric === 'requestRate') setRequestRate(data);
  //       if (metric === 'producerByteRate') setProducerByteRate(data);
  //       if (metric === 'bytesConsumedRate') setBytesConsumedRate(data);
  //     })
  //     // if (JSON.stringify(avgReqLatency) !== '{}'){
  //     //   makeDataSets(avgReqLatency)
  //     // }
  //   }
  // }
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

    // console.log('state offlinepart', offlinePartitions);
    // console.log('state activecont', activeControllers);
    // console.log('state underrep', underReplicated);
    // console.log('state avgreqlatency', avgReqLatency);

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
                <SideNav handlePortAndDomain = {handlePortAndDomain} />
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
                  avgReqLatency={avgReqLatency}
                  responseRate={responseRate}
                  requestRate={requestRate}
                  producerByteRate={producerByteRate}
                  bytesConsumedRate={bytesConsumedRate}
                  // avgDataSets={avgDataSets}
                  
                />
              </Box>
            </Grid>
        </>
    )
}

export default MainDisplay;

