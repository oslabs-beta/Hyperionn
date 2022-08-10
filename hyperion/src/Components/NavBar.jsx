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
import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';



export function NavBar () {

  //const [sidebarAppear, setSideBarAppear] = useState(false);
  const [anchorEl, setMenuAppear] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

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

  async function handleSubmit(e) {

    e.preventDefault()

    try {
      await logout()
      navigate("/")
    } catch {
      setError("Failed to logout")
    }
  }




  return(
    <AppBar id="NavBar">
      <Box>
        <Button variant="contained" sx={button} onClick={handleSubmit}>
          <LogoutIcon></LogoutIcon>
        </Button>
      </Box>
    </ AppBar>
    );
};

export default NavBar;