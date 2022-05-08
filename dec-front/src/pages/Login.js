import React, { Component } from "react";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import styles from "../styles/login_and_register.module.css";
import { AuthorizeUser } from "../services";
import { Drop, Woman, LogoPic, Avatar1 } from "../img";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

// component Login
export default class Login extends Component {
  /**
   * constructor of Login
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      userInvalid: false,
      pwInvalid: false,
      currentUser: AuthorizeUser.getCurrentUser(),
    };
  }

  /**
   * handles change in username-input
   * @param {Event} e
   */
  onChangeUsername(e) {
    this.setState({
      message: "",
      username: e.target.value,
      userInvalid: false,
    });
  }

  /**
   * handles change in password-input
   * @param {Event} e
   */
  onChangePassword(e) {
    this.setState({
      message: "",
      password: e.target.value,
      pwInvalid: false,
    });
  }

  /**
   * handles login
   * @param {Event} e
   */
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      message: "",
    });

    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        userInvalid: !this.state.username,
        pwInvalid: !this.state.password,
        loading: false,
      });
      return;
    }

    AuthorizeUser.login(this.state.username, this.state.password).then(
      () => {
        this.props.history.push("/home");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          userInvalid: true,
          pwInvalid: true,
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  /**
   * render-function of Login
   */
  render() {
    const { currentUser } = this.state;

    if (currentUser != null) {
      this.props.history.push("/home");
      window.location.reload();
    }
    return (
      <Container
        className={styles.body_font}
        fluid
        style={{ width: "100%", paddingLeft: "0px" }}
      >
        <Image
          style={{ padding: 0, position: "sticky", top: "0%" }}
          src={Drop}
          className="position-fixed h-100"
        ></Image>

        <Navbar
          className="z-100"
          style={{
            width: "100%",
            paddingLeft: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          <Col></Col>
          <Link to="./">
            <Col>
              <img style={{
            width: "100%",
            paddingLeft: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }} src={LogoPic} alt="Decryptio" />
            </Col>
          </Link>
          <Col></Col>
        </Navbar>

        <Row className="main-content">
          <Col className="d-flex" style={{ pointerEvents: "none" }}>
            <Image
              src={Woman}
              className="mx-auto my-auto h-60 p-2"
              fluid
            ></Image>
          </Col>
          <Col className="d-flex">
            <div
              className="mx-auto my-auto w-55 h-30 d-inline jumbotron"
              style={{
                background: "white",
                paddingTop: "0px",
                paddingBottom: "0px",
                boxShadow: "2px 2px 30px 2px",
                borderRadius: "0px",
              }}
            >
              <div className="d-flex justify-content-center mb-3 ">
                <Image
                  src={Avatar1}
                  className="mx-auto my-auto h-60 p-2"
                  fluid
                ></Image>
              </div>
              <h3 className={styles.t_align}>Welcome to Decryptio</h3>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={(values) => {
                  console.log({ values });
                }}
                onFinishFailed={(error) => {
                  console.log({ error });
                }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  className={styles.formin2}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username",
                    },
                    { whitespace: true },
                    { min: 6 },
                  ]}
                  hasFeedback
                  onChange={this.onChangeUsername}
                >
                  <Input
                    placeholder="Type your username"
                    className={styles.inputbox}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  className={styles.formin1}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                    { min: 8 },
                  ]}
                  hasFeedback
                  onChange={this.onChangePassword}
                >
                  <Input.Password
                    placeholder="Type your password"
                    className={styles.inputbox}
                  />
                </Form.Item>

                <Form.Item className={styles.formin1}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleLogin}
                    disabled={this.state.loading}
                    className={styles.b}
                    value="large"
                  >
                    Click to Login
                  </Button>
                </Form.Item>
                <Form.Item className={styles.formin1}>
                  <Col className={styles.mycol}>
                    <Link className={styles.linkto} to="/register">
                      Don't have an account?
                    </Link>
                  </Col>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
