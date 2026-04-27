import React from "react";
import URLBar from "./URLBar";

const Navbar = ({ setPreviewUrl }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-black text-md font-bold">SS</span>
          </div>
          <h1 className="text-md font-bold text-white hidden sm:block">
            ScreenSync
          </h1>
        </div>

        <div className="flex-1 max-w-2xl">
          <URLBar onSubmit={setPreviewUrl} />
        </div>
        <div className=""></div>
        <div className="flex items-center gap-3">
          <button className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition">
            Login
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-bold transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
