import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, message } from "antd";
import { motion } from "framer-motion";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { IMAGES } from "../../utils/image.constant";

export const apiBaseUrl = "https://fakestoreapi.com/products";

function Products({ limit }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { cart: cartProducts, addToCart } = useCartStore();

  const { data: productData, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetch(`${apiBaseUrl}`).then((res) => res.json()),
  });

  const filteredProducts = productData?.filter((product) =>
    product?.title.toLowerCase().includes(query?.toLowerCase())
  );

  const productToShow = query
    ? filteredProducts
    : limit
    ? productData?.slice(0, limit)
    : productData;

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

  const ProductSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Skeleton.Image
        active
        style={{ width: "250px", height: "200px", marginBottom: "20px" }}
      />
      <Skeleton active paragraph={{ rows: 2 }} style={{ width: "100%" }} />
      <Skeleton.Button
        active
        style={{
          width: "100%",
          marginTop: "10px",
        }}
      />
    </motion.div>
  );

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {isLoading ? (
          [...Array(8)]?.map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : productToShow?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 20px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={IMAGES.PRODUCT_NOT_FOUND}
              alt="Not Found"
              style={{
                width: "115px",
                height: "115px",
                // marginBottom: "20px",
                filter:
                  "brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2592%) hue-rotate(208deg) brightness(102%) contrast(101%)",
              }}
            />
            <h3
              style={{ fontSize: "20px", color: "#444", marginBottom: "10px" }}
            >
              No products found
            </h3>
            <p style={{ color: "#888", fontSize: "16px" }}>
              We couldn’t find anything for <strong>"{query}"</strong>
            </p>
          </motion.div>
        ) : (
          productToShow?.map((singleProduct) => {
            const { id, image, title, price } = singleProduct;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: "100%",
                    height: "200px",
                    marginBottom: "15px",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={image}
                    alt={title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => navigate("/product/:id".replace(":id", id))}
                  />
                </motion.div>

                <h4
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                    flexGrow: 1,
                  }}
                  onClick={() => navigate("/product/:id".replace(":id", id))}
                >
                  {title}
                </h4>

                <h5
                  style={{
                    marginBottom: "15px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  ${price}
                </h5>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  style={{ width: "100%" }}
                >
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      addCartBtnClickHandler(singleProduct);
                    }}
                    style={{
                      width: "100%",
                      fontWeight: "500",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Add to cart
                  </Button>
                </motion.div>

                {cartProducts?.some((item) => item.id === id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#52c41a",
                      color: "white",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(Products);
