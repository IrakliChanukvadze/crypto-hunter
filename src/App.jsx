import { Button, Drawer, Pagination, makeStyles } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Home from "./pages/Home";
import CoinPage from "./pages/CoinPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Context } from "./Context";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:coinId" element={<CoinPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
