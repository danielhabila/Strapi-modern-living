import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CartMenu from "./CartMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  const [cartToggle, setCartToggle] = useState(false);

  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative z-10 ">
      <div className="absolute flex justify-between items-center w-screen py-3 px-[1rem] md:px-[2.5rem] bg-white/80 h-fit ">
        <div>
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer font-mono text-xl font-bold"
          >
            Modern/Living
          </h1>
        </div>
        <div className="hidden md:space-x-8 md:flex md:pr-10">
          <a href="/furniture">Furniture</a>
          <a href="/dining">Dining</a>
          <a href="/accessories">Wall Art</a>
          <a href="/lighting">Lighting</a>
        </div>
        <button className="hidden md:flex relative">
          <ShoppingBagIcon
            onClick={() => setCartToggle(!cartToggle)}
            className=" w-7 "
          />
          {/* Badge desktop format */}
          <span
            className={
              cart.length === 0
                ? "hidden"
                : "absolute right-5 w-5 h-5 bg-yellow-400 rounded-full grid place-content-center font-semibold text-sm"
            }
          >
            {cart.length}
          </span>
        </button>
        <div className="hidden max-md:flex cursor-pointer items-center">
          <div className="relative flex">
            <ShoppingBagIcon
              onClick={() => {
                setCartToggle(!cartToggle);
              }}
              className="w-7 "
            />
            {/* Badge mobile format */}
            <span
              className={
                cart.length === 0
                  ? "hidden"
                  : "absolute right-5 w-5 h-5 bg-yellow-400 rounded-full grid place-content-center font-semibold text-sm"
              }
            >
              {cart.length}
            </span>
          </div>
          <div onClick={handleNav} className="ml-6 ">
            {!nav ? (
              <XMarkIcon className="w-7" />
            ) : (
              <Bars3Icon className="w-7" />
            )}
          </div>
        </div>
        {cartToggle && (
          <CartMenu
            setCartToggle={setCartToggle}
            className="ease-in-out duration-500"
          />
        )}
      </div>
      <div className="relative">
        <div
          className={
            !nav
              ? "fixed h-[25%] w-[100%] inset-x-0 inset-y-12 bg-white text-black grid grid-col place-content-center text-center space-y-4 rounded-b-xl"
              : "hidden"
          }
        >
          <a href="/furniture">Furniture</a>
          <a href="/dining">Dining</a>
          <a href="/accessories">Wall Art</a>
          <a href="/lighting">Lighting</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
