import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography, Layout } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";
import "../styles/market.css";


const Markets = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const { Title } = Typography;

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <DefaultLayout>
        <Layout>
          <Title level={3} className="heading">
            Global Crypto Statistics
          </Title>
          <Row gutter={[10, 5]}>
            <Col span={8}>
              <Card className="conmove" hoverable>
                Total Crypto Tokens
                <p>
                  <b>{globalStats.total}</b>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="conmove" hoverable>
                Total Exchanges
                <p>
                  <b>{millify(globalStats.totalExchanges)}</b>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="conmove" hoverable>
                Total Market Capital
                <p>
                  <b>{`$${millify(globalStats.totalMarketCap)}`}</b>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="conmove" hoverable>
                Total 24h Volume
                <p>
                  <b>{`$${millify(globalStats.total24hVolume)}`}</b>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="conmove" hoverable>
                Total Markets
                <p>
                  <b>{millify(globalStats.totalMarkets)}</b>
                </p>
              </Card>
            </Col>
          </Row>
        </Layout>
        {!simplified && (
          <Row className="scryptobox">
          <Col span={8}>
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
          </Col>
          </Row>
        )}
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos?.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              {/* Note: Change currency.id to currency.uuid  */}
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      alt=""
                      src={currency.iconUrl}
                    />
                  }
                  hoverable
                >
                  <p>Price: ${millify(currency.price)}</p>
                  <p>Market Cap: ${millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </DefaultLayout>
    </div>
  );
};

export default Markets;
