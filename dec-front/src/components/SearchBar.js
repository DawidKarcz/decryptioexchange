import { useState } from "react";
import CoinSearch from "./CoinSearch";
import Loader from "./Loader";

const SearchBar = ({ Coin, toggle, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");

  let content;

  if (Coin.data) {
    content = (
      <div className="coinsearchformCon">
        <input
          className="coinsearchBar"
          type="text"
          placeholder="Search Cryptocurrency"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="coinsearchform">
          {Coin.data
            .filter((value) => {
              if (searchTerm === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              } else {
                return null;
              }
            })
            .map((coin) => (
              <CoinSearch
                onAdd={onAdd}
                searchCoin={coin}
                key={Coin.data.indexOf(coin)}
                toggle={toggle}
              />
            ))}
        </div>
      </div>
    );
  }

  if (Coin.loading) {
    content = <Loader />;
  }

  if (Coin.error) {
    content = <p>Sorry but Error has occured when fetching the CoinGecko API. Please try again in a moment.</p>;
  }

  return content;
};

export default SearchBar;
