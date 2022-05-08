import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {
  const [Coin, Coins] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    Coins({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        Coins({
          loading: false,
          data: res.data,
          error: false,
        });
      })
      .catch(() => {
        Coins({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, []);

  return Coin;
};

export default useAxios;
