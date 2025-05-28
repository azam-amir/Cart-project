import { useQuery } from "@tanstack/react-query";
import { Button, Col, message, Rate, Row, Skeleton, Typography } from "antd";
import { motion } from "framer-motion";
import { memo } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { apiBaseUrl } from "./Products";

const { Title, Paragraph, Text } = Typography;

const ProductDetailSkeleton = () => (
  <Row className="max-w-[900px] !m-[40px_auto] !p-[20px] border-[1px] border-solid border-[#f0f0f0] rounded-[8px]">
    <Col span={10}>
      <Skeleton.Image className="!w-[250px] !h-[300px]" />
    </Col>
    <Col span={14} className="!pl-[20px]">
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton.Button className="!w-[120px] !mt-[20px]" active />
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
          className="!max-w-[900px] !mx-auto !my-[40px] !p-[30px] !border !border-[#eaeaea] rounded-[12px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] relative"
          gutter={[24, 24]}
        >
          <Col xs={24} sm={10}>
            <img
              src={foundProduct?.image}
              alt={foundProduct?.title}
              className="!w-full !h-auto !rounded-[12px] object-contain shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
          </Col>
          <Col xs={24} sm={14}>
            <Title level={3} className="!text-[#222]">
              {foundProduct?.title}
            </Title>
            <Paragraph className="!text-[#555] !text-[1rem]">
              {foundProduct?.description}
            </Paragraph>
            <Text strong className="!text-[1.1rem]">
              Category:{" "}
            </Text>
            <Text className="!text-[#666] !text-[1rem]">
              {foundProduct?.category}
            </Text>
            <br />
            <div className="!mt-[10px]">
              <Text strong className="!text-[1.2rem]">
                Price:{" "}
              </Text>
              <Text className="!text-[1.2rem] text-[#1890ff]">
                ${foundProduct?.price}
              </Text>
            </div>
            <br />
            <div className="flex items-center !-mt-[10px]">
              <Rate
                allowHalf
                defaultValue={foundProduct?.rating?.rate}
                disabled
                className="!text-[18px]"
              />
              <span className="!text-[0.9rem] !font-[500] !text-[#888] !ml-[10px]">
                ({foundProduct?.rating?.count} reviews)
              </span>
            </div>
            <br />
            <Button
              type="primary"
              size="large"
              className="!mt-[20px] !rounded-[6px]"
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
