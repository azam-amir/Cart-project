import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, removeAll } from "../../store/cartSlice";
import { Button, Popconfirm, Typography, message } from "antd";

function Cart() {
  const [messageApi, contextHolder] = message.useMessage();
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeCartHandler = (productId) => {
    dispatch(remove(productId));
    messageApi.open({
      type: "success",
      content: "Cart deleted Successfully!",
    });
  };
  const removeAllBtnClickHandler = () => {
    dispatch(removeAll());
    messageApi.open({
      type: "success",
      content: "All Cart is deleted!",
    });
  };
  return (
    <div>
      {contextHolder}
      {products.length === 0 ? (
        <div>
          <Typography
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#50504973",
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            Your cart is empty.
          </Typography>
        </div>
      ) : (
        <>
          <h2>Cart</h2>
          <Popconfirm
            title="Remove all task"
            description="Are you sure to delete All carts ?"
            okText="Yes"
            cancelText="No"
            onConfirm={removeAllBtnClickHandler}
          >
            <Button
              style={{
                marginLeft: "91%",
                marginBottom: "20px",
                background: "red",
                color: "white",
              }}
              // type="default"
            >
              Remove All Cart
            </Button>
          </Popconfirm>
          <div>
            {products?.map((singleProduct) => {
              const { id, image, title, price } = singleProduct;
              return (
                <div key={id} className={"cartCard"}>
                  <img src={image} alt={title} />
                  <h5>{title}</h5>
                  <h5>{price}</h5>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this cart ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => removeCartHandler(singleProduct.id)}
                  >
                    <Button
                      style={{
                        background: "red",
                        color: "white",
                      }}
                    >
                      Remove
                    </Button>
                  </Popconfirm>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
