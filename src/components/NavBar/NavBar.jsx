import { CloseCircleFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { memo, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

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
    <Layout className="min-h-[100vh]">
      <CustomHeader showSearchModal={showSearchModal} />

      {/* Search Modal */}
      <Form form={form} onFinish={onFinish}>
        <div
          ref={searchRef}
          className={`top-search-bar ${isSearchModalVisible ? "show" : ""}`}
        >
          <Form.Item name="search" className="!m-0">
            <Input
              placeholder="Search products..."
              className="!mr-[10px] !w-[300px]"
              allowClear
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <CloseCircleFilled
            className="absolute cursor-pointer -top-[5px] -right-[5px]"
            onClick={handleSearchCancel}
          />
        </div>
      </Form>

      <Content className="!p-[0_48px] !m-[16px_0]">
        <Breadcrumb className="!m-[16px_0]">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            {currentPath === "/cart" && "Cart"}
            {currentPath === "/settings" && "Settings"}
            {currentPath === "/about" && "About"}
            {currentPath === "/products" && "Products"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="!p-[24px] min-h-[280px]">
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center text-black">
        Azam Raza ©{new Date().getFullYear()} Created by @AzamRazaOfficial
      </Footer>
    </Layout>
  );
}

export default memo(NavBar);
