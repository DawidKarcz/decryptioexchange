// Creating a component to search the crypto tokens available in the cryptocurrency list provided and fetched
// fromt the CoinGecko API.
const CoinSearch = ({ searchCoin, toggle, onAdd }) => {
  return (
    <div
      className="cryptoListSearch"
      onClick={() => {
        onAdd(searchCoin);
        toggle();
      }}
    >
      <img
        src={searchCoin.image}
        alt=""
        className="searchImg"
      />
      <p>{searchCoin.name}</p>
      <p><b>{searchCoin.symbol.toUpperCase()}</b></p>
      <p><b className="text-primary">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(searchCoin.current_price)}
        </b>
      </p>
    </div>
  );
};

export default CoinSearch;
