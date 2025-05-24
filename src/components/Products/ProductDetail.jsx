import { useQuery } from "@tanstack/react-query";
import { Button, Col, message, Rate, Row, Skeleton, Typography } from "antd";
import { memo } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { apiBaseUrl } from "./Products";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const ProductDetailSkeleton = () => (
  <Row
    style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: 20,
      border: "1px solid #f0f0f0",
      borderRadius: 8,
    }}
  >
    <Col span={10}>
      <Skeleton.Image style={{ width: "250px", height: 300 }} />
    </Col>
    <Col span={14} style={{ paddingLeft: 20 }}>
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton.Button style={{ width: 120, marginTop: 20 }} active />
    </Col>
  </Row>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { cart: cartProducts, addToCart } = useCartStore();

  const { data: productData, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetch(`${apiBaseUrl}`).then((res) => res.json()),
  });

  const foundProduct = productData?.find(
    (product) => String(product?.id) === String(id)
  );

  const addCartBtnClickHandler = (product) => {
    const productId = product.id;
    const isProductInCart = cartProducts?.some((item) => item.id === productId);
    if (isProductInCart) {
      messageApi.open({
        type: "warning",
        content: "This product is already in your cart.",
        duration: 3,
      });
    } else {
      addToCart(product);
      messageApi.open({
        type: "success",
        content: "Cart Added Successfully!",
        duration: 3,
      });
    }
  };

  if (isLoading || !foundProduct) return <ProductDetailSkeleton />;

  return (
    <>
      {contextHolder}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Row
          style={{
            maxWidth: 900,
            margin: "40px auto",
            padding: 30,
            border: "1px solid #eaeaea",
            borderRadius: 12,
            backgroundColor: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            position: "relative",
          }}
          gutter={[24, 24]}
        >
          <Col xs={24} sm={10}>
            <img
              src={foundProduct?.image}
              alt={foundProduct?.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                objectFit: "contain",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Col>
          <Col xs={24} sm={14}>
            <Title level={3} style={{ color: "#222" }}>
              {foundProduct?.title}
            </Title>
            <Paragraph style={{ fontSize: "1rem", color: "#555" }}>
              {foundProduct?.description}
            </Paragraph>
            <Text strong style={{ fontSize: "1.1rem" }}>
              Category:{" "}
            </Text>
            <Text style={{ fontSize: "1rem", color: "#666" }}>
              {foundProduct?.category}
            </Text>
            <br />
            <div style={{ marginTop: "10px" }}>
              <Text strong style={{ fontSize: "1.2rem" }}>
                Price:{" "}
              </Text>
              <Text style={{ fontSize: "1.2rem", color: "#1890ff" }}>
                ${foundProduct?.price}
              </Text>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "-10px",
              }}
            >
              <Rate
                allowHalf
                defaultValue={foundProduct?.rating?.rate}
                disabled
                style={{ fontSize: "18px" }}
              />
              <span
                style={{
                  marginLeft: "10px",
                  color: "#888",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                ({foundProduct?.rating?.count} reviews)
              </span>
            </div>
            <br />
            <Button
              type="primary"
              size="large"
              style={{ marginTop: 20, borderRadius: 6 }}
              onClick={() => addCartBtnClickHandler(foundProduct)}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default memo(ProductDetail);
