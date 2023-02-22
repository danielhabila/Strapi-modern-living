import React, { useState } from "react";

import sofa from "../assets/sofa.jpg";
import dining from "../assets/dining.jpeg";
import art from "../assets/art.jpg";

import light2 from "../assets/light2.jpg";

const Home = () => {
  return (
    <div className="">
      <div className=" snap-mandatory snap-y overflow-scroll overflow-x-clip h-screen ">
        <div
          style={{
            backgroundImage: `url(${sofa})`,
          }}
          className=" w-screen h-screen snap-start bg-center bg-no-repeat bg-cover px-4 grid place-content-center text-center "
        >
          <div className="bg-gray-400/40 w-[100vw] shadow-xl space-y-4 p-3">
            <p className="text-3xl md:text-5xl font-mono ">
              Be comfortable and cozy
            </p>
            <p className="font-mono">SHOP LIVING ROOM FURNITURE</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${art})`,
          }}
          className=" w-screen h-screen snap-start bg-center bg-no-repeat bg-cover px-4 grid place-content-center text-center"
        >
          <div className="bg-gray-400/40 w-[100vw] shadow-xl space-y-4 p-3">
            <p className="text-3xl md:text-5xl font-mono ">
              Give life to your space
            </p>
            <p>SHOP WALL ART</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${dining})`,
          }}
          className=" w-screen h-screen snap-start bg-center bg-no-repeat bg-cover px-4 grid place-content-center text-center"
        >
          <div className="bg-gray-400/40 w-[100vw] shadow-xl space-y-4 p-3">
            <p className="text-3xl md:text-5xl font-mono ">
              Lets wine and dine
            </p>
            <p>SHOP DINING</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${light2})`,
          }}
          className=" w-screen h-screen snap-start bg-center bg-no-repeat bg-cover px-4 grid place-content-center text-center"
        >
          <div className="bg-gray-400/40 w-[100vw] shadow-xl space-y-4 p-3">
            <p className="text-3xl md:text-5xl font-mono ">Let the light in</p>
            <p>SHOP ROOM LIGHTING</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
