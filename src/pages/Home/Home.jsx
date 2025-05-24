import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Products from "../../components/Products/Products";
import { memo } from "react";

function Home() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "50px",
          marginTop: "-20px",
          padding: "0 15px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            color: "#333",
            marginBottom: "10px",
            lineHeight: "1.3",
          }}
        >
          Welcome to Azam's Store
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "#555",
            marginBottom: "20px",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Explore high quality products at affordable prices.
        </p>
        <Link to="/products">
          <Button type="primary" size="large" style={{ marginBottom: "10px" }}>
            View All Products
          </Button>
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ padding: "0 15px" }}
      >
        <h2
          style={{
            color: "#333",
            marginBottom: "20px",
            fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
          }}
        >
          Featured Products
        </h2>
        <Products limit={3} />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/products">
            <Button>See More Products</Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default memo(Home);
