import { Button, Popconfirm, Typography, message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import useCartStore from "../../store/useCartStore";
import { H4, H5 } from "../../components/CustomTypography/CustomTypography";

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
    <div className="!p-5 max-w-[1200px] !mx-auto">
      {contextHolder}

      <AnimatePresence>
        {cartProducts?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-[40vh] text-center"
          >
            <Typography className="!text-[30px] !font-extrabold !text-[#50504973]">
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
            <div className="flex flex-wrap justify-between items-center gap-[10px] !mb-[30px]">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[24px] !m-0"
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
                    className="!px-5 !h-10 !font-medium"
                  >
                    Clear Cart
                  </Button>
                </motion.div>
              </Popconfirm>
            </div>

            {/* Cart items */}
            <div className="grid gap-5">
              <AnimatePresence>
                {cartProducts?.map(({ id, image, title, price }) => (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-wrap items-center gap-5 bg-white rounded-[8px] !p-5 shadow-md"
                  >
                    <motion.img
                      src={image}
                      alt={title}
                      className="w-[80px] h-[80px] object-contain rounded-[4px] flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    />

                    <div className="flex-1 min-w-[200px]">
                      <H4 className="!text-[16px] !mb-[8px]">{title}</H4>
                      <H5 className="!m-0 text-[#1890ff] !text-[16px]">
                        ${price}
                      </H5>
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
                          className="!px-5 !h-[36px] whitespace-nowrap"
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
