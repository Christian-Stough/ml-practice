import React, { useRef, useState } from "react";
import { DocumentAddIcon } from "@heroicons/react/solid";

const Input_File = ({ name, onChange }) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    onChange(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {name && <label className="text-gray-700 font-semibold">{name}</label>}
      <div className="rounded-sm border border-gray-400 overflow-hidden">
        <div
          onClick={handleClick}
          className={`${
            fileName && "bg-blue-400 bg-opacity-25"
          } group w-full flex items-center px-3 py-2 text-gray-700 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md cursor-pointer hover:bg-blue-400 hover:bg-opacity-25 transition-all duration-150 ease-in focus-within:border-blue-500 focus-within:outline-none`}
        >
          <DocumentAddIcon
            className={`${
              fileName && "text-blue-400"
            } w-5 h-5 mr-2 text-gray-400 transform transition-all duration-150 group-hover:scale-110 group-hover:text-blue-400`}
          />
          <div
            data-tip={fileName || ""}
            className="text-lg group-hover:scale-100 transform transition-all duration-150 overflow-hidden overflow-ellipsis whitespace-nowrap"
          >
            {fileName || "Choose File"}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Input_File;
