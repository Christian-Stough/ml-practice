"use client";

import { useState, useEffect, useTransition } from "react";
import { Button_Like } from "@/components/Button_Like";
import { add_picture_url_to_json } from "@/util/server/like-button-add";
import { Main_Card } from "@/components/Main_Card";
import { Main_Header } from "@/components/Main_Header";
import { Graphs } from "@/components/Graphs";
import { process_question } from "@/util/server/machine-learning";
import Papa from "papaparse";

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [columnNames, setColumnNames] = useState(null);
  const [fileArray, setFileArray] = useState([]);
  const [loading, startTransition] = useTransition();
  const [fileLoading, setFileLoading] = useState(false);

  const [data, setData] = useState(null); // [ { title, columns, type, count, order, coolness } ]

  // Fetch the image URL once when the component mounts
  useEffect(() => {
    if (imageUrl === null)
      fetch("https://source.unsplash.com/random").then((response) =>
        setImageUrl(response.url)
      );
  }, []);

  const handleFileChange = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const columnNames = await getColumnNames(file);

    setColumnNames(columnNames);

    setFileLoading(true);
    const results = await processLargeCSV(file, columnNames);
    console.log(results[0]);
    setFileArray(results);
    setFileLoading(false);
  };

  const handleClick = async () => {
    startTransition(async () => {
      const results = await process_question(columnNames);

      console.log(results);

      if (typeof results !== "object") return;

      setData(results);
    });
  };

  const handleReset = () => {
    setData(null);
    setFileArray([]);
    setColumnNames(null);
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
            handleReset={handleReset}
          />

          <Graphs chartsConfig={data} sortedFile={fileArray} />
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
            fileLoading={fileLoading}
          />
        </>
      )}
    </div>
  );
}

const getColumnNames = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download: true,
      header: true,
      preview: 1,
      step: function (row, parser) {
        // Stop parsing after the first row
        parser.pause();
        parser.abort();

        // Resolve the promise with the column names
        resolve(Object.keys(row.data));
      },
      error: reject,
    });
  });
};

const processLargeCSV = async (file, columns) => {
  return new Promise((resolve, reject) => {
    let linesBuffer = [];
    let lineCount = 0;
    let resultsArray = [];

    Papa.parse(file, {
      worker: true, // To prevent UI freeze
      step: function (results) {
        linesBuffer.push(results.data);
        lineCount++;

        if (lineCount === 10000) {
          resultsArray.push(sortLines(columns, linesBuffer));
          linesBuffer = [];
          lineCount = 0;
        }
      },
      complete: function () {
        if (linesBuffer.length > 0) {
          resultsArray.push(sortLines(columns, linesBuffer));
        }

        resolve(resultsArray); // Resolve with resultsArray
      },
      error: function (err) {
        reject(err); // Reject on error
      },
    });
  });
};

const sortLines = (columns, lines) => {
  let sortedFile = {};
  columns.forEach((column) => {
    sortedFile[column] = [];
  });

  lines.forEach((line) => {
    columns.forEach((column) => {
      const value = line[columns.indexOf(column)];
      if (column === value) return;
      sortedFile[column].push(line[columns.indexOf(column)]);
    });
  });

  return sortedFile;
};
