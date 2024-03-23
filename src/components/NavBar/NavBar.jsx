import { Breadcrumb, Button, Layout, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { Content, Footer, Header } from "antd/es/layout/layout";
function NavBar() {
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Layout style={{}}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          background: "white",
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
          theme={"light"}
          mode="horizontal"
          style={{
            flex: 2,
            minWidth: 0,
            gap: "15px",
          }}
        >
          <Link to={"/"} style={{ color: "black", marginLeft: "20px" }}>
            Home
          </Link>
          <Link to={"/cart"} style={{ color: "black", marginLeft: "20px" }}>
            Cart
          </Link>
          <Link to={"/about"} style={{ color: "black", marginLeft: "20px" }}>
            About
          </Link>
        </Menu>
        {items.length > 0 && (
          <div>
            <span
              style={{
                fontWeight: 600,
                fontSize: "18px",
                marginRight: "10px",
                color: "black",
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
          <Breadcrumb.Item>
            {currentPath === "/cart" && "Cart"}
            {currentPath === "/settings" && "Settings"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          color: "black",
        }}
      >
        Azam Raza ©{new Date().getFullYear()} Created by @AzamRazaOfficial
      </Footer>
    </Layout>
  );
}

export default NavBar;
