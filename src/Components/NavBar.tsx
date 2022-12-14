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
import { useAuth } from "../Pages/AuthContext";
import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';



const NavBar = (): JSX.Element => {

  interface errorMsg { result: string }

  const [error, setError] = useState <errorMsg>({ result: '' })
  const navigate = useNavigate()
  const { logout } = useAuth()

  const button: { backgroundColor: string, color: string, margin: string, boxShadow: string, '&:hover': {backgroundColor: string, color: string }} = {
    backgroundColor: "#ffffff",
    color: '#a4a4a4',
    margin:"10px",
    boxShadow:"none",
    "&:hover": {
      backgroundColor: "#f6f6f6",
      color: "#a4a4a4"
    },
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      await logout()
      navigate("/")
    } catch {
      setError({ result: "Failed to logout" })
    }
  }


  return(
    <AppBar id="NavBar" position="absolute">
      <Box>
        <Box id="rightSide">
          <Button variant="contained" sx={button} onClick={handleSubmit}>
            <LogoutIcon></LogoutIcon>
          </Button>
        </Box>
      </Box>
    </ AppBar>
    );
};

export default NavBar;