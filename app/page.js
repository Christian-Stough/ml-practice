"use client";

import { useState, useEffect, useTransition } from "react";
import { Button_Like } from "@/components/Button_Like";
import { add_picture_url_to_json } from "@/util/server/like-button-add";
import { Main_Card } from "@/components/Main_Card";
import { Main_Header } from "@/components/Main_Header";
import { Graphs } from "@/components/Graphs";
import { parseCSV } from "@/util/server/csv_to_array";

const HomePage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileArray, setFileArray] = useState([]);
  const [loading, startTransition] = useTransition();

  const [data, setData] = useState(null); // [ { title, columns, type, count, order, coolness } ]

  // Fetch the image URL once when the component mounts
  useEffect(() => {
    if (imageUrl === null)
      fetch("https://source.unsplash.com/random").then((response) =>
        setImageUrl(response.url)
      );
  }, []);

  const handleFileChange = async (file) => {
    setFile(file);

    const formData = new FormData();

    formData.append("file", file);

    const data = await parseCSV(formData);
    setFileArray(data);
  };

  const handleClick = async () => {
    let formData = new FormData();
    formData.append("data", file);
    startTransition(async () => {
      // const results = await process_question(formData);
      // console.log(results);

      // if (typeof results !== "object") return;

      const results = [
        {
          title: "Position Distribution",
          columns: ["Pos"],
          desc: "A visual representation of the distribution of different positions in the dataset.",
          label: [
            {
              column: "Pos",
              name: "Position",
            },
          ],
          type: "pie",
          coolness: 72.3,
        },
        {
          title: "Extra Points and Field Goals",
          columns: ["XPM", "XPA", "FGM", "FGA"],
          desc: "A comparison of successful extra points and field goals made by players.",
          label: [
            {
              column: "XPM",
              name: "Extra Points Made",
            },
            {
              column: "XPA",
              name: "Extra Points Attempted",
            },
            {
              column: "FGM",
              name: "Field Goals Made",
            },
            {
              column: "FGA",
              name: "Field Goals Attempted",
            },
          ],
          type: "doughnut",
          coolness: 78.9,
        },
        {
          title: "Player's Age vs Points Scored",
          columns: ["Age", "Pts"],
          desc: "An analysis of how age affects the number of points scored by players.",
          label: [
            {
              column: "Age",
              name: "Player's Age",
            },
            {
              column: "Pts",
              name: "Points Scored",
            },
          ],
          type: "line",
          coolness: 85.6,
        },
        {
          title: "Total Points Distribution",
          columns: ["Pts"],
          desc: "A visual representation of the distribution of total points scored by players.",
          label: [
            {
              column: "Pts",
              name: "Total Points",
            },
          ],
          type: "polarArea",
          coolness: 88.7,
        },
        {
          title: "Touchdowns by Type",
          columns: [
            "RshTD",
            "RecTD",
            "PR TD",
            "KR TD",
            "FblTD",
            "IntTD",
            "OthTD",
          ],
          desc: "A comparison of different types of touchdowns scored by players.",
          label: [
            {
              column: "RshTD",
              name: "Rushing TDs",
            },
            {
              column: "RecTD",
              name: "Receiving TDs",
            },
            {
              column: "PR TD",
              name: "Punt Return TDs",
            },
            {
              column: "KR TD",
              name: "Kickoff Return TDs",
            },
            {
              column: "FblTD",
              name: "Fumble Recovery TDs",
            },
            {
              column: "IntTD",
              name: "Interception Return TDs",
            },
            {
              column: "OthTD",
              name: "Other TDs",
            },
          ],
          type: "bar",
          coolness: 91.2,
        },
      ];

      setData(
        results.sort((a, b) => {
          if (a.coolness > b.coolness) return 1;
          else if (a.coolness < b.coolness) return -1;
          else return 0;
        })
      );
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

          <Graphs chartsConfig={data} fileArray={fileArray} />
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
