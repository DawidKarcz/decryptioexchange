// imports
import React from "react";
import AuthService from "../services/AuthorizeUser";
import TradingViewWidget from "react-tradingview-widget";
import { Container, Image, Navbar, Form, Modal } from "react-bootstrap";
import {
  PageNotFound,
  LogoPic,
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
import { UserService, ExchangeService } from "../services";
import DefaultLayout from "../components/DefaultLayout";
import styles from "../styles/home.module.css";
import { Row, Col, Layout, Card, Table, Button } from "antd";

// component Coin
export default class HomeCoinInfo extends React.Component {
  /**
   * constructor of Coin
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.onChangeCoin = this.onChangeCoin.bind(this);
    this.onChangeUSD = this.onChangeUSD.bind(this);

    this.state = {
      symbol: this.props.match.params.coin,
      coin: this.getNameFromSymbol(this.props.match.params.coin),
      currentUser: UserService.getCurrentUser(),
    };
  }

  /**
   * executes on mount
   */
  componentDidMount() {
    if (this.state.coin !== undefined) {
      window.addEventListener("resize", this.resize);
      this.getBalance();
      this.getAPIData(this.state.coin);
      this.setTextAndLogo();
      this.getUserValue();
    }
  }

  getUserValue() {
    UserService.getUserValue(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          userValue: response.uservalue.toFixed(5),
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

  /**
   * executes on update
   */
  componentDidUpdate() {
    this.getBalance();
  }

  /**
   * executes on unmount
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => this.updateWindowDimension();
  /**
   * resizes the chart
   */
  updateWindowDimension() {
    this.setState({
      mainHeight:
        window.innerHeight - document.getElementById("navbar").offsetHeight,
    });
  }

  /**
   * sets text and logo dependent on coin
   */
  setTextAndLogo() {
    var text;
    var logo;
    switch (this.state.symbol) {
      case "btc":
        text = `Bitcoin is the first digital currency that allows users to send and receive money, without the interference of
         a central bank or government. Instead, a network of thousands of peers is controlling the transactions; a decentralized system.
         Bitcoins useful qualities (decentralized, borderless, secure) arent the only reason the coin is worth so much. 
         Due to its scarcity (and its hard to produce), Bitcoin is often nicknamed Digital Gold, in reference to classic 
         physical gold. Like gold, Bitcoin also has a finite supply of coins available; there will only ever be 21 million 
         bitcoin. And now you know why the creation of new bitcoins is also called mining.`;
        logo = BTC_logo;
        break;
      case "eth":
        text = `Ethereum (ETH) is a global, public decentralized blockchain designed to run peer-to-peer smart contracts.
         It allows developers to deploy all sorts of decentralized applications (Dapps), without the interference of third 
         parties. Ethereum is also used for its own cryptocurrency ether. Ethereum is now the worlds second-most valued 
         cryptocurrency platform.`;
        logo = ETH_logo;
        break;
      case "usdt":
        text = `Tether (USDT) has pegged its USDT tokens to the price of the US dollar by using blockchain technology. 
        Tether belongs to the category cryptocurrencies called stablecoins that aims to keep cryptocurrency valuations 
        stable, in opposition to other cryptocurrencies, such as Bitcoin and Ethereum.`;
        logo = USDT_logo;
        break;
      case "xrp":
        text = `Ripple is both a digital currency (XRP) and an open payment network within which that currency is transferred.
         Ripple connects banks from all around the world, to provide immediate cross-border transactions with fewer 
         intermediaries. Ripple aims to provide both parties an end-to-end visibility throughout the transactions. 
         The main purpose of XRP is to make it possible to exchange cryptocurrencies and fiat.`;
        logo = XRP_logo;
        break;
      case "bch":
        text = `Bitcoin Cash (BCH) is a hard fork of bitcoin. Its an electronic cash platform that allows peer-to-peer online
         cash payments to be made without the clearance of a clearinghouse. One of the most pressing issues for bitcoin has 
         always been its scalability; the size of a block of transactions was limited to one MB. Bitcoin Cash was initiated
          to increase this block size.`;
        logo = BCH_logo;
        break;
      case "bsv":
        text = `Bitcoin Satoshi Vision (BSV), or short said Bitcoin SV, is a fork from Bitcoin Cash. This project is called 
        Satoshi Vision or SV, because it aims to restore the Bitcoin protocol, by creating a stable, scalable, and secure 
        payment method.`;
        logo = BSV_logo;
        break;
      case "ltc":
        text = `Litecoin is a peer-to-peer decentralized digital currency with an instant, near zero-cost payment service to 
        peers across the world. It features a faster transaction confirmation status, along with a refined storage competency.
         The average block mining speed in Litecoin is 2.5 minutes, compared to bitcoins 10 minutes.`;
        logo = LTC_logo;
        break;
      case "bnb":
        text = `Binance Coin (BNB) is used for trading on the Binance exchange. When using Binance Coin you will receive a 
        discount on the fees you need to pay. Binance aims to create a Decentralized Exchange (DEX) where Binance coin will 
        function as the underlying token. Binance Coin is built on the Ethereum blockchain.`;
        logo = BNB_logo;
        break;
      case "eos":
        text = `EOS is an operating system on the blockchain that runs decentralized applications for businesses. 
        The main focus of the platform is the performance and scalability of smart contracts and transaction throughput. 
        EOS is built to be horizontally scalable so that in the future it can handle thousands of business apps.`;
        logo = EOS_logo;
        break;
      case "xtz":
        text = `Tezos (XTZ) is a smart contract platform that uses blockchain voting to be self-governing by its token holders.
         Also, the platform aims to boost the security of smart contracts through formal verification of code. 
         The creators of Tezos believe that a decentralized system must be decentralized at all levels; all the decisions 
         must be taken decentralized, especially the proposals to improve or change the project.`;
        logo = XTZ_logo;
        break;
      case "doge":
        text = `Dogecoin (DOGE) is the famous Doge internet meme turned into a full-fledged cryptocurrency. It is 
        created to be a joke currency but it grew into something bigger and more serious than intended. 
        Dogecoin is now described as a decentralized, peer-to-peer digital currency that aims to enable users to
         easily send money online. The dog is their mascot and was popularized as an online meme and represents the coin.`;
        logo = DOG_logo;
        break;
      default:
        text = undefined;
        logo = undefined;
        break;
    }

    this.setState({
      text: text,
      logo: logo,
    });
  }

  /**
   * converts coin symbol to full name
   * @param {String} symbol
   */
  getNameFromSymbol(symbol) {
    const symbols = {
      btc: "bitcoin",
      eth: "ethereum",
      usdt: "tether",
      xrp: "xrp",
      bch: "bitcoinCash",
      bsv: "bitcoinSV",
      ltc: "litecoin",
      bnb: "binancecoin",
      eos: "eos",
      xtz: "tezos",
      doge: "dogecoin",
    };

    return symbols[symbol];
  }

  /**
   * gets balance of user
   */
  getBalance() {
    UserService.getUserBalance(this.state.currentUser.username).then(
      (response) => {
        this.setState({
          currentUSD: response.balance.toFixed(5),
          currentCoin: response[this.state.coin].toFixed(5),
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

  /**
   * gets coin price
   * @param {String} coin
   */
  getAPIData(coin) {
    ExchangeService.getCurrentPrice(coin).then((response) => {
      this.setState({
        price: response,
      });
    });
    ExchangeService.getPercentChange(coin).then((response) => {
      this.setState({
        changeH: response.hour,
        changeD: response.day,
        changeW: response.week,
      });
      response.hour >= 0
        ? (document.getElementById("changeH").style.color = "#28A745")
        : (document.getElementById("changeH").style.color = "#EF534F");
      response.day >= 0
        ? (document.getElementById("changeD").style.color = "#28A745")
        : (document.getElementById("changeD").style.color = "#EF534F");
      response.week >= 0
        ? (document.getElementById("changeW").style.color = "#28A745")
        : (document.getElementById("changeW").style.color = "#EF534F");
    });
  }

  /**
   * handles changes in coin input
   */
  onChangeCoin() {
    document.getElementById("inputUSD").value = (
      this.state.price * document.getElementById("inputCoin").value
    ).toFixed(5);
  }

  /**
   * handles changes in USD input
   */
  onChangeUSD() {
    document.getElementById("inputCoin").value = (
      (1 / this.state.price) *
      document.getElementById("inputUSD").value
    ).toFixed(5);
  }

  /**
   * handles logout
   * @param {Event} e
   */
  handleLogout(e) {
    e.preventDefault();
    AuthService.logout();
    window.location.reload();
  }

  /**
   * handles buy
   * @param {Event} e
   */
  handleBuy(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    UserService.buy(
      this.state.currentUser.username,
      this.state.coin,
      document.getElementById("inputUSD").value
    ).then(
      (response) => {
        this.getBalance();
        this.setState({
          buySuccess: true,
          coinsBought: response.coinsBought.toFixed(5),
          buyModal: true,
        });
        console.log(response);
      },
      (error) => {
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          failure: true,
          message:
            "In order to buy you have to have sufficient balance or enter the quantity of cryptos to be bought.",
        });
      }
    );
  }

  /**
   * handles sell
   * @param {Event} e
   */
  handleSell(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    UserService.sell(
      this.state.currentUser.username,
      this.state.coin,
      document.getElementById("inputUSD").value
    ).then(
      (response) => {
        this.getBalance();
        this.setState({
          sellSuccess: true,
          coinsSold: response.coinsSold.toFixed(5),
        });
        console.log(response);
      },
      (error) => {
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          failure: true,
          message:
            "In order to sell input the amount of crypto to be sold ( Remember you need to own the crypto first )",
        });
      }
    );
  }

  /**
   * render-function of Coin
   */
  render() {
    const {
      currentUser,
      currentUSD,
      currentCoin,
      coinsBought,
      coinsSold,
      price,
      changeH,
      changeD,
      changeW,
      coin,
      symbol,
      text,
      logo,
      userValue,
    } = this.state;

    if (currentUser === null) {
      this.props.history.push("/login");
      window.location.reload();
    }

    const columns = [
      {
        title: "Amount of Coins Owned",
        dataIndex: "owned",
        align: "left",
      },
      {
        title: "Total Price of Coins",
        dataIndex: "price",
        align: "right",
      },
    ];

    const columns1 = [
      {
        title: "Change of Price in Hour",
        dataIndex: "priceH",
        align: "left",
        color: `${changeH}`,
      },
    ];

    const columns2 = [
      {
        title: "Change of Price in a Day",
        dataIndex: "priceD",
        align: "left",
        color: `${changeD}`,
      },
    ];

    const columns3 = [
      {
        title: "Change of Price over Week",
        dataIndex: "priceW",
        align: "left",
        color: `${changeW}`,
      },
    ];

    const columnsbuy = [
      {
        title: "Bought",
        dataIndex: "buy",
      },
      {
        title: "Total",
        dataIndex: "total",
      },
      {
        title: "Balance",
        dataIndex: "balance",
      },
    ];

    const databuy = [
      {
        key: { currentUser },
        buy: `${coinsBought + " " + symbol.toUpperCase()} x`,
        total: `${currentCoin + " " + symbol.toUpperCase()} x`,
        balance: `$${currentUSD}`,
      },
    ];

    const columnssell = [
      {
        title: "Sold",
        dataIndex: "sold",
      },
      {
        title: "Total",
        dataIndex: "totals",
      },
      {
        title: "Balance",
        dataIndex: "balances",
      },
    ];

    const datasell = [
      {
        key: { currentUser },
        sold: `${coinsSold + " " + symbol.toUpperCase()} x`,
        totals: `${currentCoin + " " + symbol.toUpperCase()} x`,
        balances: `$${currentUSD}`,
      },
    ];

    const data = [
      {
        key: { currentUser },
        owned: `${currentCoin}x`,
        price: `${(price * currentCoin).toFixed(2)}$`,
      },
    ];

    const data1 = [
      {
        key: "1",
        priceH: `${changeH}%`,
        priceD: `${changeD}%`,
        priceW: `${changeW}%`,
      },
    ];

    if (coin === undefined) {
      return (
        <Container fluid>
          <Navbar className="z-100">
            <Navbar.Brand href="./">
              <img src={LogoPic} alt="DecryptioExchange" />
            </Navbar.Brand>
          </Navbar>

          <Row className="main-content">
            <Image src={PageNotFound} className="mx-auto my-auto"></Image>
          </Row>
        </Container>
      );
    }

    return (
      <DefaultLayout>
        <Layout>
          <Row>
            <Col span={24}>
              <h5 className="text-center">
                <img src={logo} alt="logo" className={styles.tradehead}></img>
                {coin.slice(0, 1).toUpperCase() + coin.slice(1)}{" "}
                <span className="text-secondary">{symbol.toUpperCase()}</span>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.tradingW}>
              <TradingViewWidget
                autosize
                symbol={this.state.symbol + "USD"}
                interval="5"
                timezone="Europe/Dublin"
                theme="Dark"
                locale="en"
                toolbar_bg="#f1f3f6"
                hide_top_toolbar
              />
            </Col>
          </Row>

          <Layout>
            <Row>
              <Col span={24}>
                <Card>
                  <span className="text-align-left">{text}</span>
                </Card>
              </Col>
            </Row>
          </Layout>

          <Layout>
            <Row>
              <Col span={24}>
                <div className=" text-center">
                  <h5 className="w-100 mt-2">
                    {symbol.toUpperCase() +
                      " Statistics and Amount in your Portfolio"}
                  </h5>
                  <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                  />
                </div>
              </Col>
            </Row>
          </Layout>

          <Layout>
            <Row>
              <Col span={8}>
                <Table
                  id="changeH"
                  columns={columns1}
                  dataSource={data1}
                  bordered
                  pagination={false}
                />
              </Col>

              <Col span={8}>
                <Table
                  id="changeD"
                  columns={columns2}
                  dataSource={data1}
                  bordered
                  pagination={false}
                />
              </Col>

              <Col span={8}>
                <Table
                  id="changeW"
                  columns={columns3}
                  dataSource={data1}
                  bordered
                  pagination={false}
                />
              </Col>
            </Row>
          </Layout>

          <Layout>
            <Row>
              <Col span={24} className={styles.bscard}>
                <Col span={24}>
                  <div className={styles.bscardT}>
                    <h5 className={styles.bscardTC}>
                      {"Current Price of " + symbol.toUpperCase()}
                    </h5>
                    <h4>
                      <b className={styles.bscardTC1}>${price}</b>
                    </h4>
                    <h4>
                      Your Balance: <b>${userValue}</b>
                    </h4>
                    <h4>
                      Dollars Left : <b>${currentUSD}</b>
                    </h4>
                  </div>
                </Col>
                <Form className={styles.bscard1}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <div className={styles.formT}>
                        <Form.Label>
                          {"Amount of " + symbol.toUpperCase()}
                        </Form.Label>
                      </div>
                      <div className={styles.inmoveL}>
                        <Form.Control
                          id="inputCoin"
                          className={styles.formove}
                          onChange={this.onChangeCoin}
                          placeholder="0.00000x"
                          type="number"
                        ></Form.Control>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className={styles.formT}>
                        <Form.Label>Price in US Dollars</Form.Label>
                      </div>
                      <div className={styles.inmoveR}>
                        <Form.Control
                          id="inputUSD"
                          className={styles.formove}
                          onChange={this.onChangeUSD}
                          placeholder="$0.00"
                          type="number"
                        ></Form.Control>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <div className={styles.btmove}>
                        <Button
                          className={styles.btbuy}
                          onClick={this.handleBuy}
                          disabled={this.state.loading}
                        >
                          Buy
                        </Button>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className={styles.btmove}>
                        <Button
                          className={styles.btsell}
                          onClick={this.handleSell}
                          disabled={this.state.loading}
                        >
                          Sell
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Layout>
        </Layout>

        <Layout>
          <Modal
            size="md"
            centered
            show={this.state.buySuccess}
            onHide={() => this.setState({ buySuccess: false, loading: false })}
          >
            <Modal.Header className={styles.succback} closeButton>
              <Modal.Title>You made a successful purchase!</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.failback1}>
              <Table
                columns={columnsbuy}
                dataSource={databuy}
                bordered
                pagination={false}
              />
            </Modal.Body>
          </Modal>

          <Modal
            size="md"
            centered
            className={styles.succcard}
            show={this.state.sellSuccess}
            onHide={() => this.setState({ sellSuccess: false, loading: false })}
          >
            <Modal.Header className={styles.succback} closeButton>
              <Modal.Title>You made a successful sale!</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.failback1}>
              <Table
                columns={columnssell}
                dataSource={datasell}
                bordered
                pagination={false}
              />
            </Modal.Body>
          </Modal>

          <Modal
            size="md"
            centered
            show={this.state.failure}
            onHide={() => this.setState({ failure: false, loading: false })}
          >
            <Modal.Header className={styles.failback} closeButton>
              <Modal.Title>Transaction failed! Try Again</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.failback1}>
              {this.state.message}
            </Modal.Body>
          </Modal>
        </Layout>
      </DefaultLayout>
    );
  }
}
