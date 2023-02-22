import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../state/cartReducer";

import { Tab } from "@headlessui/react";
import useFetch from "../hooks/useFetch.jsx";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemDetails() {
  const { data, loading, error } = useFetch("/furnitures?populate=*");
  const uploadURL = import.meta.env.VITE_APP_UPLOAD_URL;
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [qty, setQty] = useState(1);
  const [item, setItem] = useState(null);
  const [pullImg, setPullImg] = useState([]);

  // const imageIds = pullImg.map((image) => image.id);
  // const selectedImageId = imageIds[1];

  async function fetchItem() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/furnitures/${itemId}`
      );
      setItem(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchImages() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/furnitures/${itemId}?populate=*`
      );
      // console.log(res.data.data);
      const content = res.data.data?.attributes?.img?.data;

      const call = content.map((one) => {
        return uploadURL + one.attributes.url;
      });
      setPullImg(call);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(pullImg[1]);
  useEffect(() => {
    fetchImages();
    fetchItem();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {/* small images navigation */}
                {pullImg.map((image) => (
                  <Tab
                    key={image.id}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {pullImg.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item?.attributes.name}
            </h1>

            <div className="mt-3">
              <p className="text-2xl text-gray-900">
                ${item?.attributes.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="space-y-6 text-base text-gray-700" />
              <p className="italic font-semibold text-xl">Description</p>
              <p>{item?.attributes.description}</p>
            </div>

            <form className="mt-6">
              <div className="sm:flex-col1 mt-10 flex items-center space-x-4">
                {/* Quantity input */}
                <div>
                  <div className="flex items-center border border-gray-200 divide-x divide-gray-200 rounded">
                    <button
                      type="button"
                      className="w-10 h-10  leading-10 text-gray-600 transition hover:opacity-75 grid place-content-center"
                      onClick={() => setQty(Math.max(qty - 1, 1))}
                    >
                      −
                    </button>

                    <div className="h-10 w-16  border-transparent grid place-content-center">
                      {qty}
                    </div>
                    <button
                      type="button"
                      className="w-10 h-10  leading-10 text-gray-600 transition hover:opacity-75 grid place-content-center"
                      onClick={() => setQty(qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  // type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      addToCart({
                        id: item?.id,
                        name: item?.attributes.name,
                        price: item?.attributes.price,
                        img: pullImg[0],
                        qty,
                      })
                    );
                  }}
                >
                  Add to bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
