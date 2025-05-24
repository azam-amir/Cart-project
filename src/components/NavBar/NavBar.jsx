import { CloseCircleFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomHeader from "../CustomHeader/CustomHeader";

function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [form] = Form.useForm();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchModalVisible(false);
      }
    }

    if (isSearchModalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchModalVisible]);

  const showSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  const handleSearchCancel = () => {
    setIsSearchModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const query = values.search.trim();
    if (query) {
      navigate(`/products?q=${encodeURIComponent(query)}`);
      setIsSearchModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomHeader showSearchModal={showSearchModal} />

      {/* Search Modal */}
      <Form form={form} onFinish={onFinish}>
        <div
          ref={searchRef}
          className={`top-search-bar ${isSearchModalVisible ? "show" : ""}`}
        >
          <Form.Item name="search" style={{ margin: 0 }}>
            <Input
              placeholder="Search products..."
              style={{ width: "300px", marginRight: "10px" }}
              allowClear
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <CloseCircleFilled
            style={{
              position: "absolute",
              cursor: "pointer",
              top: -5,
              right: -5,
            }}
            onClick={handleSearchCancel}
          />
        </div>
      </Form>

      <Content style={{ padding: "0 48px", margin: "16px 0" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            {currentPath === "/cart" && "Cart"}
            {currentPath === "/settings" && "Settings"}
            {currentPath === "/about" && "About"}
            {currentPath === "/products" && "Products"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 280 }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: "center", color: "black" }}>
        Azam Raza ©{new Date().getFullYear()} Created by @AzamRazaOfficial
      </Footer>
    </Layout>
  );
}

export default NavBar;
