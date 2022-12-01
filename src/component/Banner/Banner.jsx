import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styles from "./Banner.module.css";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className={styles.banerContainer}>
      <Container
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: "15px" }}>
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkGrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
