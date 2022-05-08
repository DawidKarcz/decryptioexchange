// imports needed liabries
import DefaultLayout from "../components/DefaultLayout";
import React from "react";
import { UserService, ExchangeService, AuthorizeUser } from "../services";
import { Row, Col, Layout, Card, List } from "antd";
import { Pie } from "@ant-design/plots";
import { Link } from "react-router-dom";
import {
  BTC_logo,
  ETH_logo,
  USDT_logo,
  XRP_logo,
  BCH_logo,
  BSV_logo,
  LTC_logo,
  BNB_logo,
  EOS_logo,
  XTZ_logo,
  DOG_logo,
} from "../img";

import styles from "../styles/home.module.css";

const { Content } = Layout;
// component Homepage
export default class Home extends React.Component {
  _isMounted = false;

  /**
   * constructor of Homepage
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.getBalance = this.getBalance.bind(this);

    this.state = {
      currentUser: AuthorizeUser.getCurrentUser(),
      portfolio: [
        { title: "USDollar", value: 0, color: "#F18F1B" },
        { title: "Bitcoin", value: 0, color: "#F18F1B" },
        { title: "Ethereum", value: 0, color: "#62688f" },
        { title: "Tether", value: 0, color: "#53ae94" },
        { title: "XRP", value: 0, color: "#292f4d" },
        { title: "BticoinCash", value: 0, color: "#f7941d" },
        { title: "BitcoinSV", value: 0, color: "#eab301" },
        { title: "Litecoin", value: 0, color: "#bebebe" },
        { title: "Binancecoin", value: 0, color: "#f3ba30" },
        { title: "EOS", value: 0, color: "#ffffff" },
        { title: "Tezos", value: 0, color: "#2c7df7" },
        { title: "Dogecoin", value: 0, color: "#2c7d3f" },
      ],
      prices: new Map(),
      visibility: [
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
        "hidden",
      ],
      message: "",
    };
  }

  /**
   * executes on mount
   */
  componentDidMount() {
    this._isMounted = true;
    this.getUserValue();
    this.getAPIData();
  }

  /**
   * gets the user value of money from backend server
   */
  getUserValue() {
    UserService.getUserValue(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          userValue: response.uservalue.toFixed(2),
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
        });
      }
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * gets cryptocurrency prices from backend server
   */
  getAPIData() {
    var pricesMap = new Map();
    var n = 0;
    [
      "bitcoin",
      "ethereum",
      "tether",
      "xrp",
      "bitcoinCash",
      "bitcoinSV",
      "litecoin",
      "binancecoin",
      "eos",
      "tezos",
      "dogecoin",
    ].forEach((coin) => {
      ExchangeService.getCurrentPrice(coin).then((response) => {
        response = parseFloat(response).toFixed(2);
        console.log(response);
        pricesMap.set(coin, response);
        n++;
        console.log(n);
        if (n === 10) {
          this.setState({ prices: pricesMap });
          this.getBalance();
        }
      });
    });
  }

  /**
   * gets portfolio from backend
   */
  getBalance() {
    UserService.getUserBalance(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          currentUSD: response.balance.toFixed(2),
          portfolio: [
            {
              title: "USDollar",
              type: "$USD",
              value: response.balance,
              color: "#CBD4C6",
            },
            {
              title: "Bitcoin",
              type: "BTC",
              value: response.bitcoin * this.state.prices.get("bitcoin"),
              color: "#f18f1b",
            },
            {
              title: "Ethereum",
              type: "ETH",
              value: response.ethereum * this.state.prices.get("ethereum"),
              color: "#62688f",
            },
            {
              title: "Tether",
              type: "USDT",
              value: response.tether * this.state.prices.get("tether"),
              color: "#53ae94",
            },
            {
              title: "XRP",
              type: "XRP",
              value: response.xrp * this.state.prices.get("xrp"),
              color: "#292f4d",
            },
            {
              title: "BticoinCash",
              type: "BCH",
              value:
                response.bitcoinCash * this.state.prices.get("bitcoinCash"),
              color: "#EA3C53",
            },
            {
              title: "BitcoinSV",
              type: "BSV",
              value: response.bitcoinSV * this.state.prices.get("bitcoinSV"),
              color: "#eab301",
            },
            {
              title: "Litecoin",
              type: "LTC",
              value: response.litecoin * this.state.prices.get("litecoin"),
              color: "#bebebe",
            },
            {
              title: "Binancecoin",
              type: "BNB",
              value:
                response.binancecoin * this.state.prices.get("binancecoin"),
              color: "#f3ba30",
            },
            {
              title: "EOS",
              type: "EOS",
              value: response.eos * this.state.prices.get("eos"),
              color: "#ffffff",
            },
            {
              title: "Tezos",
              type: "XTZ",
              value: response.tezos * this.state.prices.get("tezos"),
              color: "#2c7df7",
            },
            {
              title: "Dogecoin",
              type: "DOGE",
              value: response.dogecoin * this.state.prices.get("dogecoin"),
              color: "#2c7d3f",
            },
          ],
        });
        console.log(this.state.portfolio);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          message: resMessage,
        });
      }
    );
  }

  /**
   * Rendering function of the homepage
   */
  render() {
    const { currentUser, userValue, portfolio, prices } = this.state;

    if (currentUser == null) {
      this.props.history.push("/login");
      window.location.reload();
    }

    const config = {
      appendPadding: 10,
      data: portfolio,
      angleField: "value",
      colorField: "type",
      radius: 0.9,
      legend: {
        layout: "vertical",
        position: "right",
      },
      label: {
        type: "spider",
        labelHeight: 32,
        content: "{name}\n{percentage}",
        style: {
          fontSize: 12,
        },
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
    };

    return (
      <div>
        <DefaultLayout>
          <Layout>
            <Content>
              <Row gutter={16}>
                <Col breakpoint="sm" span={24} className={styles.piechart}>
                  <div className={styles.shadow}>
                    <h4 className={styles.title}>
                      Current Balance: ${userValue}
                    </h4>
                    <Pie {...config} />
                  </div>
                </Col>

                <Col span={24} breakpoint="sm">
                  <Card
                    title="Currently Available Coins"
                    className={styles.piechartc}
                  >
                    <List itemLayout="horizontal">
                      <Link to="/btc">
                        <List.Item>
                          <div className={styles.hd1}>
                            01.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={BTC_logo}
                                alt="BTC logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Bitcoin <span className="text-secondary">BTC</span>
                          </div>

                          <div className="h5 d-inline float-right">
                            ${prices.get("bitcoin")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/eth">
                        <List.Item>
                          <div className={styles.hd1}>
                            02.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={ETH_logo}
                                alt="ETH logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Ethereum <span className="text-secondary">ETH</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("ethereum")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/usdt">
                        <List.Item>
                          <div className={styles.hd1}>
                            03.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={USDT_logo}
                                alt="USDT logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Tether <span className="text-secondary">USDT</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("tether")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/xrp">
                        <List.Item>
                          <div className={styles.hd1}>
                            04.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={XRP_logo}
                                alt="XRP logo"
                                className={styles.imglog1}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            XRP <span className="text-secondary">XRP</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("xrp")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/bch">
                        <List.Item>
                          <div className={styles.hd1}>
                            05.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={BCH_logo}
                                alt="BCH logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Bitcoin Cash{" "}
                            <span className="text-secondary">BCH</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("bitcoinCash")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/bch">
                        <List.Item>
                          <div className={styles.hd1}>
                            06.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={BSV_logo}
                                alt="BSV logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Bitcoin SV{" "}
                            <span className="text-secondary">BSV</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("bitcoinSV")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/ltc">
                        <List.Item>
                          <div className={styles.hd1}>
                            07.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={LTC_logo}
                                alt="LTC logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Litecoin <span className="text-secondary">LTC</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("litecoin")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/bnb">
                        <List.Item>
                          <div className={styles.hd1}>
                            08.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={BNB_logo}
                                alt="BNB logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Binancecoin{" "}
                            <span className="text-secondary">BNB</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("binancecoin")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/eos">
                        <List.Item>
                          <div className={styles.hd1}>
                            09.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={EOS_logo}
                                alt="EOS logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Eos <span className="text-secondary">EOS</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("eos")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/xtz">
                        <List.Item>
                          <div className={styles.hd1}>
                            10.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={XTZ_logo}
                                alt="XTZ logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Tezos <span className="text-secondary">XTZ</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("tezos")}
                          </div>
                        </List.Item>
                      </Link>

                      <Link to="/doge">
                        <List.Item>
                          <div className={styles.hd1}>
                            11.
                            <div className="d-inline pl-5 m-0">
                              <img
                                src={DOG_logo}
                                alt="DOG logo"
                                className={styles.imglog}
                              ></img>
                            </div>
                          </div>
                          <div className="h5 w-10 d-inline">
                            {" "}
                            Dogecoin{" "}
                            <span className="text-secondary">DOGE</span>
                          </div>
                          <div className="h5 d-inline float-right">
                            ${prices.get("dogecoin")}
                          </div>
                        </List.Item>
                      </Link>

                      <List.Item
                        style={{ paddingTop: "10px", fontWeight: "bold" }}
                        className="d-flex justify-content-center align-items-center "
                      >
                        Addition of more coins is in progress...
                      </List.Item>
                    </List>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </DefaultLayout>
      </div>
    );
  }
}
