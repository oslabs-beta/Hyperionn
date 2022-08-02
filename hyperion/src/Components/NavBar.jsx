import React from "react";
import { AppBar, Box, Button } from "@mui/material";
//import { render } from 'react-dom';

export function NavBar () {

    return(
    <AppBar 
      id="NavBar"
      sx={{
    }}>
      <Box>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor:"#120a27",
            margin:"10px 20px",
            "&:hover": {
                backgroundColor: "#ececec",
                color: "#63489b"
              },
        }}>Login</Button>
      </Box>
    </ AppBar>
    );
};

export default NavBar;