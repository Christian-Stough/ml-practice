"use client";

import { useState, useEffect, useTransition } from "react";
import { Button_Like } from "@/components/Button_Like";
import { add_picture_url_to_json } from "@/util/server/like-button-add";
import { Main_Card } from "@/components/Main_Card";
import { Main_Header } from "@/components/Main_Header";
import { Graphs } from "@/components/Graphs";

const HomePage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, startTransition] = useTransition();

  const [data, setData] = useState(null); // [ { title, columns, type, count, order, coolness } ]

  // Fetch the image URL once when the component mounts
  useEffect(() => {
    if (imageUrl === null)
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
    startTransition(async () => {
      //await new Promise((resolve) => setTimeout(resolve, 5000));
      //const results = await process_question(formData);
      // console.log(results);

      const results = [
        {
          title: "Population Distribution",
          columns: ["Population code", "Population name"],
          type: "bar",
          count: 10,
          order: "desc",
          coolness: 85.2,
        },
        {
          title: "Superpopulation Distribution",
          columns: ["Superpopulation code", "Superpopulation name"],
          type: "chart",
          count: 10,
          order: "desc",
          coolness: 79.5,
        },
        {
          title: "Sample Distribution by Sex",
          columns: ["Sample name", "Sex"],
          type: "bar",
          count: 10,
          order: "desc",
          coolness: 87.8,
        },
        {
          title: "Most Common Data Collections",
          columns: ["Data collections"],
          type: "bar",
          count: 10,
          order: "desc",
          coolness: 82.1,
        },
        {
          title: "Population Elasticity",
          columns: ["Population elastic ID"],
          type: "chart",
          count: 10,
          order: "desc",
          coolness: 76.3,
        },
        {
          title: "Distribution of Biosample IDs",
          columns: ["Biosample ID"],
          type: "bar",
          count: 10,
          order: "desc",
          coolness: 84.7,
        },
        {
          title: "Population and Superpopulation Comparison",
          columns: ["Population code", "Superpopulation code"],
          type: "bubble",
          count: 10,
          order: "asc",
          coolness: 91.2,
        },
        {
          title: "Sample and Population Comparison",
          columns: ["Sample name", "Population name"],
          type: "bubble",
          count: 10,
          order: "asc",
          coolness: 88.6,
        },
        {
          title: "Population and Data Collections Comparison",
          columns: ["Population name", "Data collections"],
          type: "bubble",
          count: 10,
          order: "asc",
          coolness: 93.8,
        },
        {
          title: "Superpopulation and Data Collections Comparison",
          columns: ["Superpopulation name", "Data collections"],
          type: "bubble",
          count: 10,
          order: "asc",
          coolness: 90.4,
        },
      ];
      setData(results);
    });
  };

  return (
    <div
      className={`relative w-full h-screen flex gap-4 ${
        data ? "justify-top flex-col" : "justify-center items-center"
      }  bg-neutral-100 px-4 sm:px-0 bg-cover`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.15), rgba(0, 0, 255, 0.15)), url(${imageUrl})`,
      }}
    >
      {data ? (
        <>
          <Main_Header
            handleFileChange={handleFileChange}
            handleClick={handleClick}
            loading={loading}
          />

          <Graphs count={5} />
        </>
      ) : (
        <>
          <Button_Like
            className="!w-[150px] absolute top-2 left-2 z-20"
            handleClick={async () => {
              await add_picture_url_to_json(imageUrl);
            }}
          />
          <Main_Card
            handleFileChange={handleFileChange}
            handleClick={handleClick}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
