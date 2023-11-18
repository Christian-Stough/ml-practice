import React, { useEffect, useRef, useState } from "react";
import FullScreenGraphModal from "./Fullscreen_Graph_Modal";
import Chart from "../util/chart_config";

export const Graphs = ({ chartsConfig, csvData }) => {
  const canvasRefs = Array.from({ length: chartsConfig.length }, () =>
    useRef(null)
  );
  const [charts, setCharts] = useState([]); // [ { index, name, type, data, options } ]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChart, setModalChart] = useState(null);

  useEffect(() => {
    const chartData = chartsConfig.map((config, i) => ({
      index: i,
      name: config.title,
      type: config.type,
      data: {},
      options: {},
      label: config.label,
      columns: config.columns,
      description: config.desc,
    }));

    // const chartTypes = [
    //   "line",
    //   "bubble",
    //   "pie",
    //   "bar",
    //   "doughnut",
    //   "polarArea",
    //   "scatter",
    // ];

    const chartInstances = canvasRefs.map((canvasRef, i) => {
      const ctx = canvasRef.current.getContext("2d");
      const chartType = chartData[i].type;
      const chartLabel = chartData[i].label;

      const data =
        chartType === "bubble" || chartType === "scatter"
          ? Array.from({ length: 10 }, () => ({
              x: Math.random(),
              y: Math.random(),
              ...(chartType === "bubble" && { r: Math.random() * 10 }),
            }))
          : Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

      console.log(data);

      const labels = Array.from({ length: 10 }, (_, i) => `Label ${i}`);

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

      if (chartType === "polarArea") {
        options.scales = {
          r: {
            ticks: {
              color: "rgba(0, 0, 0, 0.5)", // 50% opacity black color
            },
          },
        };
      }

      chartData[i].type = chartType;
      chartData[i].data = {
        labels,
        datasets: [
          {
            label: chartLabel, // use chartLabel here
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
          labels,
          datasets: [
            {
              label: chartLabel, // use chartLabel here
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
    <div className="grid grid-cols-3 gap-4 p-4 overflow-y-auto">
      {canvasRefs.map((ref, i) => (
        <div
          className="w-full h-fit flex justify-center
         bg-white bg-opacity-50 backdrop-blur-md rounded shadow-xl 
         p-4 m-2 relative transform transition-transform duration-500 hover:scale-105"
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

// create a js function that will make a random chart name in the format of "Column 1 vs Column 2"

function randomChartName() {
  const columns = [
    "Total_Revenue",
    "Yards_Per_Carry",
    "Customer_Age",
    "Zipcodes",
    "Email_Addresses",
    "Flight_Durations",
    "Battery_Life_Hours",
    "Average_Temperatures",
    "Book_Titles",
    "Movie_Ratings",
    "Employee_Salaries",
    "Game_Scores",
    "Heart_Rates",
    "Survey_Responses",
    "Delivery_Times",
    "Water_Depths",
    "Memory_Usage",
    "Vehicle_Speeds",
    "Page_Views",
    "Event_Dates",
  ];
  const randomIndex1 = Math.floor(Math.random() * columns.length);
  let randomIndex2 = Math.floor(Math.random() * columns.length);

  if (randomIndex1 === randomIndex2) {
    randomIndex2 = Math.floor(Math.random() * columns.length);
  }

  const randomColumn1 = columns[randomIndex1].replace(/_/g, " ");
  const randomColumn2 = columns[randomIndex2].replace(/_/g, " ");

  return `${randomColumn1} vs ${randomColumn2}`;
}
