import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useCartStore from "../../store/useCartStore";
import { mobileLinks } from "../../utils/constant";

const CustomHeader = ({ showSearchModal }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { cart: cartProducts } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 15);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      animate={{
        borderRadius: isSticky ? "0px" : "10px",
        margin: isSticky ? "0px" : "0px 20px",
        top: isSticky ? 0 : 15,
        boxShadow: isSticky
          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
          : "0 2px 4px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: "sticky",
        zIndex: 999,
        background: "white",
        padding: "0 24px",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "transparent",
          padding: 0,
          height: "80px",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              cursor: "pointer",
              background: "white",
              height: "45px",
              width: "55px",
              borderRadius: "13px",
            }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              flex: 1,
              minWidth: 0,
              gap: "15px",
              borderBottom: "none",
            }}
          >
            {mobileLinks?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                style={{ color: "black", marginLeft: "20px" }}
              >
                {item?.title}
              </Link>
            ))}
          </Menu>
        )}

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Button
            type="link"
            icon={<SearchOutlined style={{ fontSize: "18px" }} />}
            onClick={showSearchModal}
            style={{ color: "black" }}
          />

          <Badge count={cartProducts?.length} overflowCount={99}>
            <Button
              type="link"
              icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
              onClick={() => navigate("/cart")}
              style={{ color: "black" }}
            />
          </Badge>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{ color: "black" }}
            />
          )}
        </div>
      </Header>

      {/* Drawer for Mobile Links */}
      <Drawer
        placement="top"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        height={100}
        className="header-top-drawer"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                cursor: "pointer",
                background: "white",
                height: "45px",
                width: "55px",
                marginTop: 5,
                marginRight: 10,
              }}
              onClick={() => navigate("/")}
            />
            {mobileLinks?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                onClick={() => setDrawerVisible(false)}
                style={{ color: "black" }}
              >
                {item?.title}
              </Link>
            ))}
          </div>
          <CloseOutlined
            style={{ cursor: "pointer", marginRight: 27, fontSize: 18 }}
            onClick={() => setDrawerVisible(false)}
          />
        </div>
      </Drawer>
    </motion.div>
  );
};

export default memo(CustomHeader);
