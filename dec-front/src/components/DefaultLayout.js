// Importing needed liabries
import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PoweroffOutlined,
  DiffOutlined,
  BulbOutlined,
  FundOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";


// Setting up variables from the ant design liabry to let it equal to the default layout for the whole application
const { Header, Sider, Content, Footer } = Layout;

// Creating a React Component DefaultLayout which would act as a template design for the whole application
class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

 
  // Creating a toggle function to collapse and expand the Sider Navigation from the antd design
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // Creating a function to allow the user to logout from his account and to remove the user item and make him not authorized
  // to use the application until logged in back again
  logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  // Rendering and returning the default layout component to the website so it can be shown on the screen
  render() {
    return (
      <Layout>
        <Sider
         
          trigger={null}
          collapsible
          breakpoint="sm"
          collapsedWidth="75"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          collapsed={this.state.collapsed}
          style={{ position: "sticky", height: "100%", top: "0%" }}
        >
          <div className="logo">
            {this.state.collapsed ? <h3 className="logoh3">DecEx</h3> : <h1>Decryptio</h1>}
          </div>
          <Menu
            
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="/home" icon={<HomeOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="/watchlist" icon={<DiffOutlined />}>
              <Link to="/watchlist">Watchlist</Link>
            </Menu.Item>
            <Menu.Item key="/market" icon={<BulbOutlined />}>
              <Link to="/market">Market</Link>
            </Menu.Item>
            <Menu.Item key="/education" icon={<FundOutlined />}>
              <Link to="/education">News</Link>
            </Menu.Item>
            <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<PoweroffOutlined />}>
              <Link onClick={this.logout}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "sticky",
              top: "0%",
              zIndex: "9999",
            }}
          >

           <div className="flex justify-content-between">

             <div>
             {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
             </div>

             <div style={{display : this.state.collapsed ? 'none' : 'inline'}}>
             </div>

           </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              position: "sticky",
              overflow: "inherit",
              width: "100%",
            }}
          >
            Copyright © 2021 Decryptio Exchange All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// Exporting the DefaultLayout component so it could be used all around the application
export default DefaultLayout;
