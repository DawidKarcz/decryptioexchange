import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Typography, Row, Col, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  ThunderboltOutlined,
  StopOutlined,
  TrophyOutlined,
  BankOutlined,
  CheckOutlined,
  NumberOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import Loader from '../components/Loader';

import LineChart from "../components/LineChart";
import DefaultLayout from "../components/DefaultLayout";

const { Title, Text } = Typography;
const { Option } = Select;

const MarketCoinInfo = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  console.log("cryptoDetails: ", cryptoDetails);

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },

    {
      title: "All time high",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of tickets ",
      value: cryptoDetails?.numberOfMarkets,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <BankOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <DefaultLayout>
      <Row>
    <Col span={24} className="detail-cont">
      <div>
      <Col  className="containerHead">
        <Title level={2} className="coinHead">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price Representation
        </Title>
        <p>
          {cryptoDetails.name} live data showing price in US Dollar (USD). View value
          statistics, total market capital and supply quantity.
        </p>
      </Col>
      <Select
        defaultValue="3h"
        className="timeSelect"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart 
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Row>
      <Col span={24} className="statisticsCont">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-details-heading">
              {cryptoDetails.name} Statistics
            </Title>
            <p className="bolderH">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and All time high.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p className="bolderH">
              An overview showing more statistics of {cryptoDetails.name}, such
              as the number of exchanges, the total and circulating supply.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      </Row>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
      </div>
    </Col>
    </Row>
    </DefaultLayout>
  );
};

export default MarketCoinInfo;