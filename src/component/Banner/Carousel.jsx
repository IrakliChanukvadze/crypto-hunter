import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(Context);
  const [quantity, setQuantity] = useState(2);
  const [prevInnerWidth, setPrevInnerWidth] = useState();

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          textUnderline: "none",
          textDecoration: "none",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span
          style={{
            textDecorationLine: "none",
            color: "white",
          }}
        >
          {coin.symbol}
          &nbsp;
          <span style={{ color: profit ? "rgb(14, 203, 129)" : "red" }}>
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}"%"
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: quantity,
    },
  };

  useEffect(() => {
    setPrevInnerWidth(window.innerWidth);
    setQuantity(window.innerWidth > 1024 ? 4 : window.innerWidth > 720 ? 3 : 2);
  }, []);
  function watchWidth() {
    if (
      window.innerWidth - prevInnerWidth > 400 ||
      prevInnerWidth - window.innerWidth > 400
    ) {
      setQuantity(
        window.innerWidth > 1024 ? 4 : window.innerWidth > 720 ? 3 : 2
      );
    }
  }

  window.addEventListener("resize", watchWidth);

  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        autoPlay
        disableButtonsControls
        keyboardNavigation="true"
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
