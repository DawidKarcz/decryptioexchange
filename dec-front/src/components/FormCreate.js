import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { useTransition, animated } from "react-spring";
import styles from "../styles/home.module.css";
import { Row, Col, Layout, Button } from "antd";
import { Form } from "react-bootstrap";

const FormCreate = ({ toggleForm, coin, updateCoin }) => {
  // Set the price of each coin and the quantity purchased of each coin.
  const [cost, setCost] = useState(coin.current_price);
  const [amount, setAmount] = useState("");

  const transition = useTransition(toggleForm, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Verify maximum length of inputs
  const maxLengthCheck = (input) => {
    if (input.target.value.length > input.target.maxLength) {
      input.target.value = input.target.value.slice(0, input.target.maxLength);
    }
  };

  const displayWorth = (e) => {
    e.preventDefault();

    if (!cost | !amount) {
      alert("You forgot to input something!");
    } else {
      toggleForm();

      //Cost and value are added to cryptocurrency.
      updateCoin({ coin, cost, amount });

      // Puts the input fields back to default value
      setCost(coin.current_price);
      setAmount("");
    }
  };

  return transition(
    (style, item) =>
      item && (
        <>
          <div className="form-mask" onClick={toggleForm}></div>
          <animated.form
            style={style}
            onSubmit={displayWorth}
            className="ContainerForm"
          >
            <Layout>
              <Row>
                <Col span={24} className={styles.bscard}>
                  <BsXCircleFill className="formExitBt" onClick={toggleForm} />
                  <Col className={styles.bscard1}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <div className={styles.formT}>
                          <Form.Label>Cost of Coins</Form.Label>
                        </div>
                        <div className={styles.inmoveL}>
                          <input
                            step="any"
                            className="input-style"
                            type="number"
                            maxLength="10"
                            placeholder="Price bought for at time"
                            value={cost}
                            onInput={maxLengthCheck}
                            onChange={(e) => {
                              setCost(e.target.value);
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className={styles.formT}>
                          <Form.Label>Amount of Coins</Form.Label>
                        </div>
                        <div className={styles.inmoveR}>
                          <input
                            className="input-style"
                            type="number"
                            placeholder="Amount of it bought"
                            maxLength="10"
                            value={amount}
                            step="any"
                            onInput={maxLengthCheck}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <div className={styles.btmove}>
                          <Button htmlType="submit" className={styles.btbuy}>
                            Add Coins
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Layout>
          </animated.form>
          
        </>
      )
  );
};

export default FormCreate;
