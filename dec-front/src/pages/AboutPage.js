// imports needed liabries
import React from "react";
import { AuthorizeUser } from "../services";
import DefaultLayout from "../components/DefaultLayout";
import { Layout } from "antd";
import styles from "../styles/aboutpage.module.css";

const { Content } = Layout;
// component About Page
export default class AboutPage extends React.Component {
  /**
   * constructor of About page
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthorizeUser.getCurrentUser(),
      message: "",
    };
  }

  /**
   * handles logout function when button clicked
   * @param {Event} e
   */
  handleLogout(e) {
    e.preventDefault();
    AuthorizeUser.logout();
    window.location.reload();
  }

  /**
   * render-function of About
   */
  render() {
    const { currentUser } = this.state;

    if (currentUser == null) {
      this.props.history.push("/login");
      window.location.reload();
    }

    return (
      <DefaultLayout>
        <Layout>
          <Content
            style={{
              margin: "24px 16px 0",

              backgroundColor: "#333333",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <div>
                <h3 className={styles.h1about}>About Decryptio Exchange</h3>
              </div>
              <br />
              <p>
                In this final year project in Computer Science at IADT Dun
                Laoighre, the goal of this online application is to provide a
                genuine{" "}
                <b className="text-primary">
                  cryptocurrency trading experience simulation
                </b>{" "}
                in a safe and secure environment. Decryptio Exchange aspires to
                provide users with a{" "}
                <b className="text-primary">
                  realistic and risk-free trading environment
                </b>{" "}
                that is synchronised to the most recent{" "}
                <b className="text-primary">exchange rates</b> in order to
                facilitate their participation in the market.
              </p>
              <br />
              <p>
                Please keep in mind that{" "}
                <b className="text-primary">this is a prototype</b>, which
                implies that some functionality will need to be modified in the
                future. Nonetheless, the Decryptio Exchange is pleased to
                deliver a fully working papertrading experience with more than{" "}
                <b className="text-primary">ten supported currencies</b>, with
                more to follow in the near future.
              </p>
              <br />
              <p>
                {" "}
                <b className="text-success">The way it works :</b> Users will
                get their first start-up funding in the amount of{" "}
                <b className="text-primary">
                  10,000 US dollars immediately upon completing registration
                </b>
                . From there, you are free to make investments in our supported
                cryptocurrencies by selling or purchasing at your convenience at
                any point in the future. In order to make{" "}
                <b className="text-primary">strategic selections</b>, the
                individual{" "}
                <b className="text-primary">
                  {" "}
                  trading charts and exchange history
                </b>{" "}
                must be considered. Before spending a single penny of real money
                on a real-world strategy, you may obtain valuable information
                and experience by practising with Decryptios simulations first.
              </p>
              <br />
              <p>
                If you have any problems with the Decryptio Exchange web
                application, do not hesitate to contact the web application's
                creator:
                <br />
                <p>
                  Dawid Karczewski - Github <br />{" "}
                  <b style={{ fontSize: "12px" }} className="text-primary">
                    https://github.com/DawidKarcz
                  </b>
                </p>
              </p>
            </div>
          </Content>
        </Layout>
      </DefaultLayout>
    );
  }
}
