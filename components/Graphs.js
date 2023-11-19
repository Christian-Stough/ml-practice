import React, { useEffect, useRef, useState } from "react";
import FullScreenGraphModal from "./Fullscreen_Graph_Modal";
import Chart from "../util/chart_config";

export const Graphs = ({ chartsConfig, sortedFile }) => {
  const canvasRefs = Array.from({ length: chartsConfig.length }, () =>
    useRef(null)
  );
  const [charts, setCharts] = useState([]); // [ { index, name, type, data, options } ]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChart, setModalChart] = useState(null);

  useEffect(() => {
    if (!chartsConfig) return;

    const chartData = chartsConfig.map((config, i) => ({
      index: i,
      type: config.type,
      name: config.title,
      description: config.desc,
      data: [],
      options: {},
      labels: [],
      "y-column": config["y-data"],
      "x-column": config["x-data"],
      filter: config["x-sort-filter"],
      average: config["x-average"],
    }));

    const chartInstances = canvasRefs.map((canvasRef, i) => {
      const ctx = canvasRef.current.getContext("2d");
      const chartType = chartData[i].type;

      let values = [];

      sortedFile.forEach((file) => {
        file[chartData[i]["x-column"]].forEach((x, innerI) =>
          values.push({
            x: x,
            y: file[chartData[i]["y-column"]][innerI],
          })
        );
      });

      if (chartData[i].name === "GDP per Capita by Country") {
        console.log("values");
        console.log(values);
      }

      let combined = {};
      const counts = {};

      values.forEach((value) => {
        let x = value.x;
        let y = value.y;

        if (typeof y === "string") {
          y = y.replace(/[$€]/g, "").trim();
          if (y === "" || y === " ") y = "0";
          y = Number(y);
          if (isNaN(y)) y = 0;
        }

        try {
          y = parseFloat(y);
        } catch (e) {
          console.log(`Error parsing ${y} to int`);
        }

        if (combined[x]) {
          combined[x] += y;
          counts[x]++;
        } else {
          combined[x] = y;
          counts[x] = 1;
        }
      });

      Object.keys(combined).forEach((key) =>
        combined[key] === undefined ? delete combined[key] : {}
      );

      const combinedArray = Object.keys(combined).map((key) => ({
        x: key,
        y: combined[key] / counts[key],
      }));

      combinedArray.sort((a, b) => {
        if (chartData[i].filter === "asc") {
          if (a.y > b.y) return 1;
          else if (a.y < b.y) return -1;
          else return 0;
        } else if (chartData[i].filter === "desc") {
          if (a.y > b.y) return -1;
          else if (a.y < b.y) return 1;
          else return 0;
        } else return 0;
      });

      if (chartData[i].name === "HDI by Region") {
        console.log("combinedArray");
        console.log(combinedArray);
      }

      let data = combinedArray.slice(0, 10);

      data = data.filter(
        (item) => item.x !== undefined && item.x !== "undefined"
      );

      data = data.sort((a, b) => {
        return parseFloat(a.y) - parseFloat(b.y);
      });
      console.log(data);

      const backgroundColors = data.map(
        () =>
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.5)`
      );

      const options = {
        responsive: true,
        plugins: {
          tooltip: { enabled: false },

          legend: {
            display: false,
          },
        },
        interaction: {
          hover: false,
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      };

      chartData[i].type = chartType;
      chartData[i].data = {
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderColor: "rgba(0, 123, 255, 1)", // Light blue color
            borderWidth: 1,
            pointBackgroundColor: "rgba(0, 123, 255, 1)", // Light blue color
          },
        ],
      };
      chartData[i].options = options;

      setCharts(chartData);

      return new Chart(ctx, {
        type: chartType,
        data: {
          datasets: [
            {
              data,
              backgroundColor: backgroundColors,
              borderColor: "rgba(0, 123, 255, 1)", // Light blue color
              borderWidth: 1,
              pointBackgroundColor: "rgba(0, 123, 255, 1)", // Light blue color
            },
          ],
        },
        options: options,
      });
    });

    return () => {
      chartInstances.forEach((chartInstance) => chartInstance.destroy());
    };
  }, [chartsConfig]);

  return (
    <div className="grid grid-cols-3 gap-4 px-8 overflow-y-auto overflow-x-hidden">
      {canvasRefs.map((ref, i) => (
        <div
          key={i}
          className="w-full h-fit flex justify-center
         bg-white bg-opacity-50 backdrop-blur-md rounded shadow-xl 
         p-4 m-2 relative transform transition-all duration-150 hover:bg-opacity-75"
          onClick={() => {
            setModalChart(charts[i]);
            setIsModalOpen(true);
          }}
        >
          <h2 className="absolute top-0 left-0 py-2 px-4 w-full overflow-hidden h-fit max-w-full max-h-fit overflow-ellipsis text-lg font-bold text-white bg-blue-950 bg-opacity-50 rounded-sm">
            {charts[i] ? charts[i].name : "Chart Name"}
          </h2>
          <canvas className="" ref={ref}></canvas>
        </div>
      ))}
      {isModalOpen && (
        <FullScreenGraphModal
          chart={modalChart}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
