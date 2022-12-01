import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { CoinList } from "../../config/api";
import axios from "axios";
import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { numberWithCommas } from "./Carousel";
import { Link, useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const { currency, symbol } = useContext(Context);
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchCurrency, setSearchCurrency] = useState("");
  const navigate = useNavigate();

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coinData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchCurrency.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchCurrency.toLocaleLowerCase())
    );
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: "18px",
          mb: "18px",
          fontFamily: "Montserrat",
        }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        id="outlined-basic"
        label="Search for crypto curreny"
        variant="outlined"
        sx={{
          width: "100%",
          mb: "18px",
          color: "primary",
          borderColor: "#fff",
        }}
        onChange={(e) => {
          setSearchCurrency(e.target.value);
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#EEBC1E", color: "black" }}>
            <TableRow sx={{ color: "black" }}>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                  key={head}
                  align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? <LinearProgress sx={{ mt: 20, height: 5 }} /> : ""}
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "#16171a",
                      "&:hover": {
                        backgroundColor: "#131111",
                      },
                    }}
                  >
                    <TableCell>
                      <div style={{ display: "flex" }}>
                        <img src={row.image} alt={row.name} height="50" />
                        <div>
                          <Typography>{row.symbol.toUpperCase()}</Typography>
                          <Typography>{row.name}</Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          color:
                            row.price_change_24h > 0
                              ? "rgb(14, 203, 129)"
                              : "red",
                        }}
                      >
                        {row.price_change_percentage_24h.toFixed(2)}
                        {"%"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      m
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          sx={{
            color: "gold",
            border: "none",
            "& .MuiPaginationItem-root": {
              color: "gold",
              ml: "8px",
            },
          }}
          count={Math.ceil(handleSearch().length / 10)}
          page={page}
          variant="outlined"
          onChange={(event, value) => {
            setPage(value);
            window.scroll(0, 460);
          }}
        />
      </div>
    </Container>
  );
};

export default CoinsTable;
