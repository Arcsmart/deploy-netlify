import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Auth from './pages/Auth/Auth';
import { Elements  } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
const stripePromise = loadStripe(
  "pk_test_51QrJHsKSaCjcMQWiVeM7BWYd2XBfI3OZcrpGA6SYpAVHLs8kfAPXXE5bnRZBr4zrpATBw9sLFKenX9f72bTl836E00zEgdbrX2"
);
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectRoute msg={"You must login to pay"} redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectRoute>
          }
        />
        <Route path="/orders" element={
          <ProtectRoute msg={'You must login ot access orders'} redirect={"/orders"}>
            <Orders />
          </ProtectRoute>
           }
           />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing