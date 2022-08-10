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
import { useAuth } from "../AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/Hyperion.png";
import SideNav from './SideNav.jsx';



export function NavBar () {

  //const [sidebarAppear, setSideBarAppear] = useState(false);
  const [anchorEl, setMenuAppear] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { logout } = useAuth()

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




  return(
    <AppBar id="NavBar">
      <Box>
        <Button variant="contained" sx={button} onClick={logout}>Logout</Button>
      </Box>
    </ AppBar>
    );
};

export default NavBar;