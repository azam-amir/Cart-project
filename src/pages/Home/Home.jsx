import React from "react";
import Products from "../../components/Products/Products";

function Home() {
  return (
    <div>
      {/* <h2>Welcome to my store</h2> */}
      <section>
        <h3>Products</h3>
        <Products />
      </section>
    </div>
  );
}

export default Home;
