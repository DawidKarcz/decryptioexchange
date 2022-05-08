//Importing the needed component
import CryptoCoins from "./CryptoCoins";

// Displaying the whole coin list table 
const CryptoFormList = ({ coins, onDelete, updateCoin }) => {
  return (
    <div className="listOfCoins">
      {coins.map((coin) => {
        return (
          <CryptoCoins
            updateCoin={updateCoin}
            coin={coin}
            key={coin.id}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default CryptoFormList;
