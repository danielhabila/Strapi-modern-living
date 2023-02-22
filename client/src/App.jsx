import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import Home from "./pages/Home";
import Confirmation from "./pages/checkout/Checkout";
import Footer from "./components/Footer";
import ItemDetails from "./pages/ItemDetails";

function App() {
  const location = useLocation();
  return (
    <div id="container">
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="furniture" element={<ItemCard />} />
          <Route path="furniture/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Confirmation />} />

          {/* <Route path={"/lighting"} element={<Lighting />} /> */}
        </Routes>
      </div>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default function () {
  return (
    <Router>
      <Navbar />
      <App />
    </Router>
  );
}
