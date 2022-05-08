const Balance = ({ coins }) => {
  let total = 0;

  const getTotal = () => {
    if (coins.length > 0) {
      coins.map((coin) => {
        if (coin.amount !== undefined) {
          return (total = total + coin.amount * coin.current_price);
        } else {
          return null;
        }
      });
    }
  };

  getTotal();

  return (
    <div className="balanceHead balanceHeadUS">
      <p>Watchlist of your favourite cryptocurrencies</p>
      <div className="text-primary">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </div>
      <p className = "warningMess">Warning: Watchlist data is being stored in the browsers localStorage.</p>
    </div>
  );
};

export default Balance;
