import { Breadcrumb, Button, Layout, Menu, Typography, theme } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Content, Footer, Header } from "antd/es/layout/layout";
function NavBar() {
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    // <header
    //   className="navBarContainer"
    //   style={{
    //     background: "white",
    //     height: "70px",
    //     width: "102.7%",
    //     marginTop: "-20px",
    //     marginLeft: "-20px",
    //     alignItems: "center",
    //   }}
    // >
    //   <div
    //     style={{ display: "flex", marginLeft: "20px", alignItems: "center" }}
    //   >
    //     {/* <span href={"/"} style={{ marginTop: "10px" }}> */}
    //     <img src={Logo} style={{ cursor: "pointer" }} />
    //     {/* </span> */}
    //     <Link className="navLink" to={"/"}>
    //       Home
    //     </Link>
    //     <Link className="navLink" to={"/cart"}>
    //       Cart
    //     </Link>
    //     <Link className="navLink" to={"/settings"}>
    //       Settings
    //     </Link>
    //   </div>
    //   {items.length > 0 && (
    //     <div>
    //       <span
    //         style={{ fontWeight: 600, fontSize: "18px", marginRight: "10px" }}
    //       >
    //         Cart Items: {items.length}
    //       </span>
    //       <Button
    //         className="btn"
    //         // type="primary"
    //         onClick={() => {
    //           navigate("/cart");
    //         }}
    //         style={{ marginRight: "10px" }}
    //       >
    //         Go to Cards
    //       </Button>
    //     </div>
    //   )}
    // </header>
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <div
          className="demo-logo"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              cursor: "pointer",
              background: "white",
              height: "45px",
              width: "55px",
              marginLeft: "-30px",
              borderRadius: "13px",
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            flex: 2,
            minWidth: 0,
            gap: "15px",
          }}
        >
          <Menu.Item>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/cart"}>Cart</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/settings"}>Settings</Link>
          </Menu.Item>
        </Menu>
        {items.length > 0 && (
          <div>
            <span
              style={{
                fontWeight: 600,
                fontSize: "18px",
                marginRight: "10px",
                color: "white",
              }}
            >
              Cart Items: {items.length}
            </span>
            <Button
              // className="btn"
              type="primary"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Go to Cards
            </Button>
          </div>
        )}
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Azam Raza ©{new Date().getFullYear()} Created by @AzamRazaOfficial
      </Footer>
    </Layout>
  );
}

export default NavBar;
