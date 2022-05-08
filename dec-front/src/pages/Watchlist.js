import { useState, useEffect } from "react";
import useAxios from "../Hooks/apiRequest";
import { useTransition, animated } from "react-spring";
import Balance from "../components/Balance";
import CryptoFormList from "../components/CryptoFormList";
import FormOpenButton from "../components/FormOpenButton";
import SearchBar from "../components/SearchBar";
import DefaultLayout from "../components/DefaultLayout";
import "../styles/watch.css";
import { Layout, Row, Col } from "antd";
function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);

  const transition = useTransition(toggleSearch, {
    from: { y: 800, opacity: 0 },
    enter: { y: 50, opacity: 1 },
    leave: { y: 800, opacity: 0 },
  });

  let Coin = useAxios();

  useEffect(() => {
    getLocalCoins();
  }, []);

  useEffect(() => {
    saveToLocal(coins);
  }, [coins]);

  // Local storage functions
  const saveToLocal = (e) => {
    localStorage.setItem("coins", JSON.stringify(e));
  };

  const getLocalCoins = () => {
    if (localStorage.getItem("coins") === null) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let localCoins = JSON.parse(localStorage.getItem("coins"));
      setCoins(localCoins);
    }
  };

  // Toggle search for coin.
  const toggle = () => {
    setToggleSearch(!toggleSearch);
  };

  // Add Coin
  const addCoin = (newCoin) => {
    // Checking if there is no duplicates present before adding.
    if (coins.length > 0) {
      coins.find((coin) => coin.id === newCoin.id)
        ? alert("Coin already added!")
        : setCoins([...coins, newCoin]);
    } else {
      setCoins([...coins, newCoin]);
    }
  };

  // Deletes the specific coin
  const deleteCoin = (id) => {
    setCoins(coins.filter((coin) => coin.id !== id));
  };

  // Updates quantity and price of coins
  const updateCoin = (e) => {
    let coin = e.coin;
    let cost = e.cost;
    let amount = e.amount;
    let updatedCoin = { ...coin, cost, amount };
    // Deletes the already existing coins so there won't be duplicates.
    let filteredCoins = coins.filter((el) => el.id !== e.coin.id);

    setCoins([...filteredCoins, updatedCoin]);
  };

  // Edits the coin price
  const updatePrice = () => {
    if (Coin.data) {
      if (JSON.parse(localStorage.getItem("coins")) !== null) {
        let savedCoinList = JSON.parse(localStorage.getItem("coins"));
        for (let i = 0; i < savedCoinList.length; i++) {
          for (let j = 0; j < Coin.data.length; j++) {
            if (Coin.data[j].id === savedCoinList[i].id) {
              savedCoinList[i].current_price = Coin.data[j].current_price;
            }
          }
        }
        saveToLocal(savedCoinList);
      }
    }
  };
  updatePrice();

  return (
    <DefaultLayout>
      <Layout>
        <Row>
          <Col span={24}>
            <div className="content-card">
              {!toggleSearch && <Balance coins={coins} />}

              {transition(
                (style, item) =>
                  item && (
                    <animated.div className="divAnimated" style={style}>
                      <SearchBar Coin={Coin} onAdd={addCoin} toggle={toggle} />
                    </animated.div>
                  )
              )}

              {!toggleSearch && (
                <CryptoFormList
                  updateCoin={updateCoin}
                  coins={coins}
                  Coin={Coin}
                  onDelete={deleteCoin}
                />
              )}
              <FormOpenButton toggle={toggle} toggleSearch={toggleSearch} />
            </div>
          </Col>
        </Row>
      </Layout>
    </DefaultLayout>
  );
}

export default Watchlist;
