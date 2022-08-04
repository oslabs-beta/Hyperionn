import React, {useState} from "react";
import { 
  AppBar,
  Box,
  Button,
  Modal,
  Typography,
  Menu,
  MenuItem,
  Fade
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/Hyperion.png";
import SideNav from './SideNav.jsx';


export function NavBar () {

  //const [sidebarAppear, setSideBarAppear] = useState(false);
  const [anchorEl, setMenuAppear] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const button = {
    backgroundColor:"#ffffff",
    color: '#a4a4a4',
    margin:"10px",
    boxShadow:"none",
    "&:hover": {
      backgroundColor: "#f6f6f6",
      color: "#a4a4a4"
    },
  }



  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setMenuAppear(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAppear(null);
  };


  // const modal = {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  // }

  // const modalBox = {
  //   display: "flex",
  //   justifyContent: "flex-start",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   height: "70%",
  //   width: "70%",
  //   backgroundColor: "lightGrey",
  //   padding: "50px",
  //   borderRadius: "5px",
  // }

  return(
    <AppBar id="NavBar">
      {/* {sidebarAppear && (
        <Box sx={{gridArea:"SideNav"}}>
          <SideNav />
        </Box>
      )} */}
      {/* <Button 
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{'aria-labelledby': 'fade-button'}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} >Connect</MenuItem>
        <MenuItem onClick={handleClose} >Topics</MenuItem>
        <MenuItem onClick={handleClose} >Error Logs</MenuItem>
        <MenuItem onClick={handleClose} >Logout</MenuItem>
      </Menu> */}
      {/* <Box>
        <img src={logo} width="45px" height="96%"></img>
      </Box> */}
      <Box>
        <Button variant="contained" sx={button} onClick={() => setLoggedIn(false)}>Logout</Button>
      </Box>

      {/* modals
      {loginAppear && (
        <Modal sx={modal} open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modalBox}>

          </Box>
        </Modal>)}

        {registerAppear && (
        <Modal sx={modal} open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modalBox}>

          </Box>
        </Modal>)} */}
    </ AppBar>
    );
};

export default NavBar;