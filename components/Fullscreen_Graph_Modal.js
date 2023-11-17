import React, { useEffect, useRef } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Chart from "../util/chart_config";

function FullScreenGraphModal({ chart, setIsModalOpen }) {
  const chartRef = useRef(null);

  console.log(chart);

  useLockBodyScroll();

  useEffect(() => {
    const { name, type, data, options } = chart;

    console.log(data);

    const chartInstance = () => {
      const ctx = chartRef.current.getContext("2d");

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      if (type === "polarArea") {
        options.scales = {
          r: {
            ticks: {
              color: "rgba(0, 0, 0, 0.5)", // 50% opacity black color
            },
          },
        };
      }

      return new Chart(ctx, {
        type: type,
        data: data,
        options: options,
      });
    };

    const instance = chartInstance();
    console.log(instance);

    return () => {
      instance.destroy();
    };
  }, [chart]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="w-full h-screen z-20 p-8 fixed top-0 left-0 bg-neutral-950 bg-opacity-50"
      onClick={closeModal}
    >
      <div className="w-full h-full relative p-4 m-auto bg-white rounded shadow flex justify-between gap-4">
        <div className="w-2/3 p-2 h-full flex items-center justify-center">
          <canvas ref={chartRef} />
        </div>

        <div className="w-1/3 h-full flex flex-col">
          <h1 className="w-full px-4 py-2 font-bold text-white bg-blue-950 bg-opacity-50 rounded-sm text-lg">
            {chart.name}
          </h1>
          <h2>Type: {chart.type}</h2>
        </div>
      </div>
    </div>
  );
}

export default FullScreenGraphModal;
