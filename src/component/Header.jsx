import {
  AppBar,
  Box,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

function Header() {
  let navigate = useNavigate();
  const { setCurrency, currency, symbol } = useContext(Context);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container sx={{ display: "flex" }}>
          <Toolbar
            sx={{
              flex: 1,
              color: "gold",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "ponter",
            }}
          >
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Crypto Hunter
            </Typography>
          </Toolbar>
          <Select
            variant="outlined"
            sc={{ width: 100, height: 40, marginRight: 15 }}
            color="primary"
            onChange={(e) => setCurrency(e.target.value)}
            value={currency}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
