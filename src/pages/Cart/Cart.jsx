import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/cartSlice";
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
  return (
    <div>
      {contextHolder}
      <h2>Cart</h2>
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
        <div className="cartWrapper">
          {products?.map((singleProduct) => {
            const { image, title, price } = singleProduct;
            return (
              <div className="cartCard">
                <img src={image} alt={title} />
                <h5>{title}</h5>
                <h5>{price}</h5>
                {/* <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this cart ?"
                  okText="Yes"
                  cancelText="No"
                  // onConfirm={() => removeCartHandler(singleProduct.id)}
                > */}
                <Button
                  onClick={() => removeCartHandler(singleProduct.id)}
                  className="btn"
                >
                  Remove
                </Button>
                {/* </Popconfirm> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cart;
