import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../component/Banner/Carousel";
import { SingleCoin } from "../config/api";
import { Context } from "../Context";
import styles from "./CoinPage.module.css";

const CoinPage = () => {
  const { coinId } = useParams();
  const [singleData, setSingleData] = useState([]);
  const { currency, symbol } = useContext(Context);

  const fetchData = async (url) => {
    const { data } = await axios.get(url);
    setSingleData(data);
  };

  useEffect(() => {
    fetchData(SingleCoin(coinId));
  }, []);
  const RankingSpan = ({ text1, text2 }) => {
    return (
      <span style={{ display: "flex" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "Montserrat",
            mb: "20px",
          }}
        >
          {text1}
        </Typography>
        &nbsp;&nbsp;
        <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
          {text2}
        </Typography>
      </span>
    );
  };
  return (
    <Grid container spacing={4} sx={{ width: "94%", ml: "3%", mt: "30px" }}>
      <Grid item>
        <div className={styles.sidebar}>
          <img
            src={singleData?.image?.large}
            alt={singleData?.name}
            style={{ height: "150px" }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              mb: "20px",
            }}
          >
            {singleData && singleData.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              width: "100%",
              padding: "0px 25px 15px 25px",
              textAlign: "justify",
            }}
            variant="subtitle1"
          >
            {singleData?.description?.en.split(", ")[0]}
          </Typography>
          <div className={styles.marketData}>
            <RankingSpan text1="Rank" text2={singleData?.market_cap_rank} />
            <RankingSpan
              text1="Current Price:"
              text2={
                singleData?.market_data?.current_price[
                  currency.toLowerCase()
                ] &&
                `${symbol} ${numberWithCommas(
                  singleData?.market_data?.current_price[currency.toLowerCase()]
                )}`
              }
            />
            <RankingSpan
              text1="Market Cap: "
              text2={
                singleData?.market_data?.market_cap[currency.toLowerCase()] &&
                `${symbol} ${numberWithCommas(
                  singleData?.market_data?.market_cap[currency.toLowerCase()]
                    ?.toString()
                    ?.slice(0, -6)
                )}M`
              }
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CoinPage;
