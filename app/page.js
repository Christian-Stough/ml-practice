"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input_File from "@/components/Input_File";
import Input_Text from "@/components/Input_Text";
import Image from "next/image";
import { process_question } from "@/util/server/machine-learning";
import { Button_Like } from "@/components/Button_Like";
import { add_picture_url_to_json } from "@/util/server/like-button-add";

const HomePage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState(null);

  // Fetch the image URL once when the component mounts
  useEffect(() => {
    fetch("https://source.unsplash.com/random").then((response) =>
      setImageUrl(response.url)
    );
  }, []);

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleClick = async () => {
    let formData = new FormData();
    formData.append("data", file);
    process_question(formData, question);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-neutral-100 px-4 sm:px-0 bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.15), rgba(0, 0, 255, 0.15)), url(${imageUrl})`,
      }}
    >
      <Button_Like
        className="!w-[150px] absolute top-2 left-2"
        handleClick={async () => {
          await add_picture_url_to_json(imageUrl);
        }}
      />
      <div className="w-full max-w-[350px] flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 w-full bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-sm p-6 text-gray-800">
          <div className="flex items-center justify-center p-4 bg-white bg-opacity-20 rounded-sm shadow">
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
          <Input_Text
            name="Question"
            placeholder="What is your question..."
            handleChange={setQuestion}
          />
          <Input_File name="File" onChange={handleFileChange} />
          <Button className="mt-4" handleClick={handleClick}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
