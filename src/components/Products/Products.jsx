import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, message } from "antd";
const apiBaseUrl = "http://fakestoreapi.com/products";

function Products() {
  const [messageApi, contextHolder] = message.useMessage();
  const [cartAlreadyExists, setCartAlreadyExists] = useState(false);
  const dispatch = useDispatch();
  const { data: productData, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetch(`${apiBaseUrl}`).then((res) => res.json()),
  });
  const products = useSelector((state) => state.cart);
  const addCartBtnClickHandler = (product) => {
    const productId = product.id;
    const isProductInCart = products.some((item) => item.id === productId);
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
        content: "Cart deleted Successfully!",
        duration: 3,
      });
      setCartAlreadyExists(true);
    }
  };
  const ProductSkeleton = () => (
    <div className="card" style={{ flexWrap: "wrap" }}>
      <Skeleton.Image style={{ width: "100px" }} />
      <Skeleton active paragraph={{ rows: 2 }} />
      {/* <Skeleton active /> */}
      <Skeleton.Button active style={{ width: "100%", marginTop: "10px" }} />
    </div>
  );
  return (
    <div>
      {contextHolder}
      <div className="productsWrapper">
        {isLoading
          ? [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
          : productData?.map((singleProduct) => {
              const { id, image, title, price, description } = singleProduct;
              return (
                <div key={id} className="card" style={{ flexWrap: "wrap" }}>
                  <img src={image} alt={title} />
                  <h4>{title}</h4>
                  <h5>{price}</h5>
                  <Button
                    // className="btn"
                    type="primary"
                    onClick={() => addCartBtnClickHandler(singleProduct)}
                    // disabled={cartAlreadyExists}
                  >
                    Add to cart
                  </Button>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Products;
