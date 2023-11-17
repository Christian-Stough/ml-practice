import React from "react";

export default function Input_Text({ name, placeholder, handleChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-700 font-semibold">{name}</label>
      <div className="rounded-sm border border-gray-400 overflow-hidden">
        <input
          name={name}
          onInput={(e) => {
            handleChange(e.target.value);
          }}
          className="w-full px-3 focus:bg-blue-400 focus:bg-opacity-25 transition-all duration-150 ease-in py-2 text-gray-700 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md focus:border-blue-500 focus:outline-none placeholder:italic"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
