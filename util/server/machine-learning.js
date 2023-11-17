"use server";
import Papa from "papaparse";
import { use_ai } from "./ai";

export async function process_question(formData) {
  try {
    // Load the CSV file from the form data
    const csvBuffer = await formData.get("data").arrayBuffer();
    const csvString = Buffer.from(csvBuffer).toString();
    const filteredData = [];
    const maxValues = {};
    let columns = [];

    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      preview: 1,
      step: function (row) {
        columns = Object.keys(row.data);
      },
    });

    const response = await use_ai(columns);

    // const response = {
    //   filterType: "and",
    //   conditions: [{ field: "RshTD", operator: ">=", value: 5 }],
    // };

    return response;
  } catch (error) {
    console.error("An error occurred during the question processing:", error);
  }
}
