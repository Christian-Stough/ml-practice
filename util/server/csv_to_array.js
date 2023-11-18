"use server";

import Papa from "papaparse";

export async function parseCSV(formData) {
  const file = await formData.get("file").arrayBuffer();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(file);

  return new Promise((resolve, reject) => {
    if (!csv) {
      reject(new Error("No file provided"));
    }

    const results = {};

    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      step: function (result) {
        for (const [key, value] of Object.entries(result.data)) {
          if (!results[key]) {
            results[key] = [];
          }
          results[key].push(value);
        }
      },
      complete: function () {
        resolve(results);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}
