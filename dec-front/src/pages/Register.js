// imports
import React, { Component } from "react";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import { AuthorizeUser } from "../services";
import { Drop, Woman, LogoPic, Avatar1 } from "../img";
import { Form, Input, Button, Progress } from "antd";
import styles from "../styles/login_and_register.module.css";
import { Link } from "react-router-dom";

// component Register
export default class Register extends Component {
  /**
   * constructor of Register
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      successful: false,
      loading: false,
      message: "",
      userInvalid: false,
      emailInvalid: false,
      pwInvalid: false,
      pwStrength: 0,
      pwColor: "",
      currentUser: AuthorizeUser.getCurrentUser(),
    };
  }

  /**
   * handles change in name-input
   * @param {Event} e
   */
  onChangeName(e) {
    this.setState({
      name: e.target.value,
      message: "",
      userNameInvalid: false,
    });

    if (1 > e.target.value.length || e.target.value.length > 20) {
      this.setState({ userNameInvalid: true });
    }
  }

  /**
   * handles change in username-input
   * @param {Event} e
   */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      message: "",
      userInvalid: false,
    });

    if (5 > e.target.value.length || e.target.value.length > 20) {
      this.setState({ userInvalid: true });
    }
  }

  /**
   * handles changes in email-input
   * @param {Event} e
   */
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      message: "",
      emailInvalid: false,
    });
  }

  /**
   * handles changes in password-input
   * @param {Event} e
   */
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      message: "",
      pwInvalid: false,
    });

    if (8 > e.target.value.length || e.target.value.length > 20) {
      this.setState({ pwInvalid: true });
    }

    switch (e.target.value.length) {
      case 0:
        this.setState({ pwStrength: 0 });
        break;
      case 1:
        this.setState({ pwStrength: 6.25 });
        break;
      case 2:
        this.setState({ pwStrength: 12.5 });
        break;
      case 3:
        this.setState({ pwStrength: 18.75 });
        break;
      case 4:
        this.setState({ pwStrength: 25 });
        break;
      case 5:
        this.setState({ pwStrength: 31.25 });
        break;
      case 6:
        this.setState({ pwStrength: 37.5 });
        break;
      case 7:
        this.setState({ pwStrength: 43.75 });
        break;
      case 8:
        this.setState({ pwStrength: 50 });
        break;
      case 9:
        this.setState({ pwStrength: 56.25 });
        break;
      case 10:
        this.setState({ pwStrength: 62.5 });
        break;
      case 11:
        this.setState({ pwStrength: 68.75 });
        break;
      case 12:
        this.setState({ pwStrength: 75 });
        break;
      case 13:
        this.setState({ pwStrength: 81.25 });
        break;
      case 14:
        this.setState({ pwStrength: 87.5 });
        break;
      case 15:
        this.setState({ pwStrength: 93.25 });
        break;
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        this.setState({ pwStrength: 100, pwColor: "success" });
        break;
      default:
        this.setState({ pwStrength: 100, pwColor: "danger" });
    }
  }

  /**
   * calls login after registration
   */
  login() {
    setTimeout(() => {
      if (this.state.successful === true) {
        AuthorizeUser.login(this.state.username, this.state.password).then(
          () => {
            this.props.history.push("/home");
            window.location.reload();
          },
          () => {
            this.login();
          }
        );
      }
    }, 1);
  }

  /**
   * handles register
   * @param {Event} e
   */
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    if (
      this.state.name === "" ||
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      this.setState({
        userNameInvalid: !this.state.name,
        userInvalid: !this.state.username,
        emailInvalid: !this.state.email,
        pwInvalid: !this.state.password,
        loading: false,
      });
      return;
    }

    if (
      this.state.userNameInvalid ||
      this.state.userInvalid ||
      this.state.emailInvalid ||
      this.state.pwInvalid
    ) {
      this.setState({
        loading: false,
      });
      return;
    }

    AuthorizeUser.register(
      this.state.name,
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      () => {
        this.setState({
          successful: true,
        });
        this.login();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  /**
   * render-function of Register
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
          <Link to="/">
            <Col>
              <img src={LogoPic} alt="Decryptio" />
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
                  label="Full Name"
                  name="name"
                  className={styles.formin2}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username",
                    },
                    { whitespace: true },
                    { min: 3 },
                  ]}
                  hasFeedback
                  onChange={this.onChangeName}
                >
                  <Input
                    placeholder="Type your full name here"
                    className={styles.inputbox}
                  />
                </Form.Item>

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
                  name="email"
                  label="Email"
                  className={styles.formin2}
                  onChange={this.onChangeEmail}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Type your email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  className={styles.formin2}
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

                <Form.Item className={styles.formin2}>
                  <Progress
                    now={this.state.pwStrength}
                    strokeColor={{
                      from: "#108ee9",
                      to: "#87d068",
                    }}
                    percent={this.state.pwStrength}
                    status="active"
                  />
                </Form.Item>

                <Form.Item className={styles.formin1}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleRegister}
                    disabled={this.state.loading}
                    className={styles.b}
                    value="large"
                  >
                    Click to Register
                  </Button>
                </Form.Item>
                <Form.Item className={styles.formin}>
                  <Col className={styles.mycol}>
                    <Link className={styles.linkto} to="/login">
                      Already own an account?
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
