import classNames from "classnames";
import React from "react";

export default function Button({ className, children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={classNames(
        className,
        "w-full flex items-center justify-center px-6 py-2 text-white bg-blue-500 rounded-sm border border-blue-500 cursor-pointer hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 ease-in shadow-md hover:shadow-lg focus:outline-none backdrop-filter backdrop-blur-md"
      )}
    >
      {children}
    </button>
  );
}
