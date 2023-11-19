import React from "react";
import Image from "next/image";
import Input_File from "./Input_File"; // Update with your actual import path
import Button from "./Button"; // Update with your actual import path

export const Main_Card = ({
  handleFileChange,
  handleClick,
  loading,
  fileLoading,
}) => {
  return (
    <div className="w-full max-w-[350px] flex flex-col items-center gap-8">
      {loading ? (
        <div className="loader w-fit"></div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 w-full bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-sm p-6 text-gray-800">
          <div className="flex items-center w-full justify-center p-4 bg-white bg-opacity-20 rounded-sm shadow">
            <Image
              src="/logo.png"
              className=""
              alt="Logo"
              width={64}
              height={64}
            />
            <span className="text-2xl font-semibold text-gray-800 -ml-3">
              Data Analyzer
            </span>
          </div>

          <Input_File
            name="File"
            onChange={handleFileChange}
            loading={fileLoading}
          />
          <Button className="" handleClick={handleClick}>
            Analyze
          </Button>
        </div>
      )}
    </div>
  );
};
