import React from "react";
import { Row, Col, Typography} from "antd";
import DefaultLayout from "../components/DefaultLayout";
import "../styles/market.css";
import News from "./News";

const Education = () => {
    const { Title } = Typography;

  return (
    <div>
      <DefaultLayout>
        <Row>
          <Col span={24}>
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Latest Crypto News
            </Title>
            
          </div>
          <News />
          </Col>
        </Row>
      </DefaultLayout>
    </div>
  );
};

export default Education;