import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../state/cartReducer";
import axios from "axios";

export default function CartMenu(props) {
  const [open, setOpen] = useState(true);

  // function matchCartToggleBool() {
  //   open ? props.setCartToggle(open) : props.setCartToggle(open);
  // }
  // matchCartToggleBool();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.qty * item?.price;
  }, 0);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transitioxn ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                          // role="list"
                          // className="-my-6 divide-y divide-gray-200"
                          >
                            {/* {products.map((item) => ( */}
                            {cart.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item?.img}
                                    alt="NA"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a>{item?.name}</a>
                                      </h3>
                                      <p className="ml-4">
                                        ${item?.price.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    {/* Quantity inputs */}
                                    <div>
                                      <div className="flex items-center border border-gray-200 divide-x divide-gray-200 rounded">
                                        <button
                                          type="button"
                                          className="w-6 h-6 leading-10 text-gray-600 transition hover:opacity-75 grid place-content-center"
                                          onClick={() => {
                                            if (item.qty > 1) {
                                              dispatch(
                                                decreaseCount({ id: item?.id })
                                              );
                                            }
                                          }}
                                        >
                                          −
                                        </button>
                                        <div className="h-6 w-10  border-transparent grid place-content-center">
                                          {item.qty}
                                        </div>

                                        <button
                                          type="button"
                                          className="w-6 h-6 leading-10 text-gray-600 transition hover:opacity-75 grid place-content-center"
                                          onClick={() =>
                                            dispatch(
                                              increaseCount({ id: item?.id })
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          dispatch(
                                            removeFromCart({ id: item?.id })
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Subtotal and checkout */}
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice.toLocaleString()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => {
                            navigate("/checkout");
                            setOpen(false);
                          }}
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
