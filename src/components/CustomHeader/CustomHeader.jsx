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
      className="sticky z-[999] bg-white !p-[0_24px]"
    >
      <Header className="flex items-center justify-between !bg-transparent !p-0 !h-[80px]">
        {/* Logo */}
        <div className="flex items-center gap-[10px]">
          <img
            src={Logo}
            alt="Logo"
            className="cursor-pointer !h-[45px] !w-[55px]"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <Menu
            theme="light"
            mode="horizontal"
            className="flex-[1] min-w-0 gap-[15px] border-b-none"
          >
            {mobileLinks?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                className="!text-black !ml-[20px]"
              >
                {item?.title}
              </Link>
            ))}
          </Menu>
        )}

        {/* Right Icons */}
        <div className="flex items-center gap-[15px]">
          <Button
            type="link"
            icon={<SearchOutlined className="!text-[18px]" />}
            onClick={showSearchModal}
            className="!text-black"
          />

          <Badge count={cartProducts?.length} overflowCount={99}>
            <Button
              type="link"
              icon={<ShoppingCartOutlined className="!text-[20px]" />}
              onClick={() => navigate("/cart")}
              className="!text-black"
            />
          </Badge>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="!text-black"
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
        <div className="flex justify-between !mt-[6px]">
          <div className="flex items-center gap-[10px]">
            <img
              src={Logo}
              alt="Logo"
              className="cursor-pointer !h-[45px] !w-[55px] !mt-[5px] !mr-[10px]"
              onClick={() => navigate("/")}
            />
            {mobileLinks?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                onClick={() => setDrawerVisible(false)}
                className="!text-black"
              >
                {item?.title}
              </Link>
            ))}
          </div>
          <CloseOutlined
            className="cursor-pointer !mr-[27px] !text-[18px]"
            onClick={() => setDrawerVisible(false)}
          />
        </div>
      </Drawer>
    </motion.div>
  );
};

export default memo(CustomHeader);
