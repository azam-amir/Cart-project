import NavBar from "../components/NavBar/NavBar";
import ProductDetail from "../components/Products/ProductDetail";
import Products from "../components/Products/Products";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";

export const AuthenticatedRoutesConstant = {
  HOME: "/",
  CART: "/cart",
  ABOUT: "/about",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:id",
};

export const AUTHENTICATED_ROUTES = [
  {
    path: AuthenticatedRoutesConstant.HOME,
    element: <NavBar />,
    children: [
      {
        path: AuthenticatedRoutesConstant.HOME,
        element: <Home />,
        index: true,
      },
      {
        path: AuthenticatedRoutesConstant.ABOUT,
        element: <About />,
        index: true,
      },
      {
        path: AuthenticatedRoutesConstant.CART,
        element: <Cart />,
        index: true,
      },
      {
        path: AuthenticatedRoutesConstant.PRODUCTS,
        element: <Products />,
        index: true,
      },
      {
        path: AuthenticatedRoutesConstant.PRODUCT_DETAIL,
        element: <ProductDetail />,
        index: true,
      },
    ],
  },
];
