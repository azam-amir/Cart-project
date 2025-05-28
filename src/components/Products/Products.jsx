import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, message } from "antd";
import { motion } from "framer-motion";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { IMAGES } from "../../utils/image.constant";
import { H3, H4, H5, P } from "../CustomTypography/CustomTypography";

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
      className="bg-white rounded-[12px] !p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col items-center h-full"
    >
      <Skeleton.Image activeclassName="w-[250px] h-[200px] !mb-5" />
      <Skeleton active paragraph={{ rows: 2 }} className="w-full" />
      <Skeleton.Button active className="w-full !mt-2.5" />
    </motion.div>
  );

  return (
    <div>
      {contextHolder}
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {isLoading ? (
          [...Array(8)]?.map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : productToShow?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="col-span-full text-center !py-[60px] !px-5 rounded-[12px] flex flex-col items-center justify-center"
          >
            <img
              src={IMAGES.PRODUCT_NOT_FOUND}
              alt="Not Found"
              className="!w-[115px] !h-[115px] custom-filter"
            />
            <H3 className="!text-[20px] !text-[#444] !mb-2.5">
              No products found
            </H3>
            <P className="!text-[#888] !text-[16px]">
              We couldn’t find anything for <strong>"{query}"</strong>
            </P>
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
                className="bg-white rounded-[12px] !p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col items-center cursor-pointer overflow-hidden relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-[200px] !mb-[15px] overflow-hidden rounded-[8px]"
                >
                  <img
                    src={image}
                    alt={title}
                    className="!w-full !h-full object-contain transition-transform duration-300 ease-in-out"
                    onClick={() => navigate("/product/:id".replace(":id", id))}
                  />
                </motion.div>

                <H4
                  className="!text-[16px] !font-[500]"
                  onClick={() => navigate("/product/:id".replace(":id", id))}
                >
                  {title}
                </H4>

                <H5 className="!mb-[15px] !text-[18px] !text-[#1890ff] !font-bold">
                  ${price}
                </H5>

                <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      addCartBtnClickHandler(singleProduct);
                    }}
                    className="w-full font-medium tracking-wide"
                  >
                    Add to cart
                  </Button>
                </motion.div>

                {cartProducts?.some((item) => item.id === id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 bg-[#52c41a] text-white rounded-full w-[30px] h-[30px] flex items-center justify-center text-[12px] font-bold"
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
