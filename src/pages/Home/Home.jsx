import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Products from "../../components/Products/Products";
import { memo } from "react";
import { H1, H2, P } from "../../components/CustomTypography/CustomTypography";

function Home() {
  return (
    <div className="!p-5 max-w-[1200px] !mx-auto w-full box-border">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-[12px] text-center !mb-[50px] !-mt-5 !px-[15px]"
      >
        <H1 className="text-[#333] text-[clamp(1.8rem, 4vw, 2.5rem)] !mb-[10px] leading-[1.3]">
          Welcome to Azam's Store
        </H1>
        <P className="!text-[17px] !text-[#555] mb-[20px]">
          Explore high quality products at affordable prices.
        </P>
        <Link to="/products">
          <Button type="primary" size="large" className="!mb-[10px]">
            View All Products
          </Button>
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="!p-[0_15px]"
      >
        <H2 className="!mb-[20px] !text-[#333]">Featured Products</H2>
        <Products limit={3} />
        <div className="text-center !mt-[20px]">
          <Link to="/products">
            <Button>See More Products</Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default memo(Home);
