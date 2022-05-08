// Importing needed liabries and components
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import FormButton from "./FormButton";
import FormCreate from "./FormCreate";

const CryptoCoins = ({ coin, onDelete, updateCoin }) => {
  const [formAppear, setFormAppear] = useState(false);

  // Calculating the price, quantity and profit plus loss and the ROI.
  let totalValue = coin.current_price * coin.amount;
  let totalCost = coin.cost * coin.amount;
  let profitOrLoss = totalValue - totalCost;
  let ROI = (100 * profitOrLoss) / totalCost;
  const priceChange = coin.price_change_percentage_24h;

  const toggleForm = () => {
    setFormAppear(!formAppear);
  };

  return (
    <>
      <div
        className="addedCoinListContainer"
        onClick={() => {
          // Displays the FormCreate to edit coin quantity and coin price when needed. 
          if ((coin.cost !== undefined) | (coin.amount !== undefined)) {
            toggleForm();
          }
        }}
      >
        <div className="padScaleCoin font-weight-bold">
          
          <img
            src={coin.image}
            alt=""
            style={{ height: "30px", width: "30px" }}
          />
          <p className = "nothing">{coin.name}</p>
         
          <div className ="">
          <span className = "price font-weight-bold">Current Price</span>
          <p title="Hooray!"> 
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.current_price)}
          </p>
          </div>
          {/* Current value of coins */}
          {(coin.cost !== undefined) | (coin.amount !== undefined) ? (
            <div className="total-value">
               <span className = "price">Total quantity</span>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalValue)}
              </p>
              <span className = "price">No of Coin</span>
              <p>{new Intl.NumberFormat().format(coin.amount)}</p>
            </div>
          ) : (
            ""
          )}

          {/* Profit & Loss */}
          {(coin.cost !== undefined) | (coin.amount !== undefined) ? (
            <div
              className={
                profitOrLoss > 0
                  ? "profit"
                  : profitOrLoss < 0
                  ? "loss"
                  : profitOrLoss === 0 && "even"
              }
            >
              <span className = "price">Profit / Loss</span>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(profitOrLoss)}
              </p>
              <span className = "price">Profit / Loss Percent</span> 
              <p>{new Intl.NumberFormat().format(ROI)}%</p>
            </div>
          ) : (
            ""
          )}

          {/* Button add which adds coins*/}
          {(coin.cost === undefined) & (coin.amount === undefined) ? (
            <FormButton setFormAppear={setFormAppear} formAppear={formAppear} />
          ) : (
            ""
          )}

          <BsFillTrashFill
            className="trash-btn"
            onClick={() => {
              onDelete(coin.id);
            }}
          />
        </div>
      </div>
      {formAppear && (
        <FormCreate updateCoin={updateCoin} coin={coin} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default CryptoCoins;