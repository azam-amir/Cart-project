import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "./Products";
import { memo } from "react";
import { Skeleton, Button, Row, Col, Typography, message, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice";

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
      <Skeleton.Image style={{ width: "100%", height: 300 }} />
    </Col>
    <Col span={14} style={{ paddingLeft: 20 }}>
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton.Button style={{ width: 120, marginTop: 20 }} active />
    </Col>
  </Row>
);

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: productData, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetch(`${apiBaseUrl}`).then((res) => res.json()),
  });

  const foundProduct = productData?.find(
    (product) => String(product?.id) === String(id)
  );

  const addCartBtnClickHandler = (product) => {
    const productId = product.id;
    const isProductInCart = productsInCart.some(
      (item) => item.id === productId
    );
    if (isProductInCart) {
      messageApi.open({
        type: "warning",
        content: "This product is already in your cart.",
        duration: 3,
      });
    } else {
      dispatch(add(product));
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
      <Row
        style={{
          maxWidth: 900,
          margin: "40px auto",
          padding: 20,
          border: "1px solid #f0f0f0",
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
        gutter={[24, 24]}
      >
        <Col xs={24} sm={10}>
          <img
            src={foundProduct.image}
            alt={foundProduct.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              objectFit: "contain",
            }}
          />
        </Col>
        <Col xs={24} sm={14}>
          <Title level={3}>{foundProduct.title}</Title>
          <Paragraph>{foundProduct.description}</Paragraph>
          <Text strong>Category: </Text>
          <Text>{foundProduct.category}</Text>
          <br />
          <div
            style={{
              marginTop: "5px",
            }}
          >
            <Text strong>Price: </Text>
            <Text>${foundProduct.price}</Text>
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
            />
            <span style={{ marginLeft: "10px", color: "#666" }}>
              ({foundProduct?.rating?.count} reviews)
            </span>
          </div>
          <br />
          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={() => addCartBtnClickHandler(foundProduct)}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default memo(ProductDetail);
