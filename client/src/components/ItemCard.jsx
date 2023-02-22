import React from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function ItemCard() {
  const { data, loading, error } = useFetch("/furnitures?populate=*");

  const navigate = useNavigate();

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {error
            ? "something went wrong"
            : loading
            ? "Loading..."
            : data?.map((item) => (
                <a key={item.id} href={item.href} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={
                        import.meta.env.VITE_APP_UPLOAD_URL +
                        item?.attributes?.img?.data[1]?.attributes.url
                      }
                      alt={item.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                      onClick={() => navigate(`/furniture/${item.id}`)}
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {item.attributes.name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${item.attributes.price.toLocaleString()}
                  </p>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
