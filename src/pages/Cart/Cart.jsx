import { Button, Popconfirm, Typography, message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import useCartStore from "../../store/useCartStore";

function Cart() {
  const [messageApi, contextHolder] = message.useMessage();
  const { cart: cartProducts, removeFromCart, clearCart } = useCartStore();

  const removeCartHandler = (productId) => {
    removeFromCart(productId);
    messageApi.open({
      type: "success",
      content: "Item removed successfully!",
    });
  };

  const removeAllBtnClickHandler = () => {
    clearCart();
    messageApi.open({
      type: "success",
      content: "All items removed from cart!",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {contextHolder}

      <AnimatePresence>
        {cartProducts?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
              textAlign: "center",
            }}
          >
            <Typography
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#50504973",
              }}
            >
              Your cart is empty.
            </Typography>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                marginBottom: "30px",
              }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: "24px", margin: 0 }}
              >
                Your Cart ({cartProducts.length})
              </motion.h2>

              <Popconfirm
                title="Clear entire cart"
                description="Are you sure you want to remove all items?"
                okText="Yes"
                cancelText="No"
                onConfirm={removeAllBtnClickHandler}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    danger
                    type="primary"
                    style={{
                      padding: "0 20px",
                      height: "40px",
                      fontWeight: "500",
                    }}
                  >
                    Clear Cart
                  </Button>
                </motion.div>
              </Popconfirm>
            </div>

            {/* Cart items */}
            <div style={{ display: "grid", gap: "20px" }}>
              <AnimatePresence>
                {cartProducts?.map(({ id, image, title, price }) => (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "20px",
                      background: "#fff",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.img
                      src={image}
                      alt={title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                      whileHover={{ scale: 1.1 }}
                    />

                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <h4 style={{ margin: 0, marginBottom: "8px" }}>
                        {title}
                      </h4>
                      <h5
                        style={{
                          margin: 0,
                          color: "#1890ff",
                          fontSize: "16px",
                        }}
                      >
                        ${price}
                      </h5>
                    </div>

                    <Popconfirm
                      title="Remove item"
                      description="Are you sure you want to remove this item?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => removeCartHandler(id)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          danger
                          style={{
                            padding: "0 20px",
                            height: "36px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    </Popconfirm>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Cart);
