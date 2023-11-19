import React from "react";
import Image from "next/image";
import Input_File from "./Input_File"; // Update with your actual import path
import Button from "./Button"; // Update with your actual import path

export const Main_Header = ({ handleFileChange, handleClick, handleReset }) => {
  return (
    <header className="flex items-center justify-between w-full h-16 p-6 bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm text-gray-800">
      <div className="flex items-center cursor-pointer" onClick={handleReset}>
        <Image src="/logo.png" className="" alt="Logo" width={64} height={64} />
        <span className="text-2xl font-semibold text-gray-800 -ml-3">
          Data Analyzer
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Input_File onChange={handleFileChange} />
        <Button className="" handleClick={handleClick}>
          Analyze
        </Button>
      </div>
    </header>
  );
};
