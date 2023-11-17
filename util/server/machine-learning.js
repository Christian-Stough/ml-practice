"use server";
import Papa from "papaparse";
import { OpenAI } from "openai";
import { prompt } from "../prompt";

export async function process_question(formData, question) {
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

    const response = await use_ai(question, columns);
    console.log(response);

    // const response = {
    //   filterType: "and",
    //   conditions: [{ field: "RshTD", operator: ">=", value: 5 }],
    // };

    console.log(question);

    // Parse the CSV string into a JavaScript array
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      complete: function () {
        console.log("Parsing complete!");
        // You can put any code here that should run after parsing is complete
      },
      step: function (row) {
        // Iterate over the filter conditions
        for (const condition of response.conditions) {
          // If the condition has the 'max' operator, update maxValues for the corresponding field
          if (
            condition.operator === "max" &&
            (!maxValues[condition.field] ||
              row.data[condition.field] > maxValues[condition.field])
          ) {
            maxValues[condition.field] = row.data[condition.field];
          }
        }

        // Apply the filter to the current row
        const passesFilter = applyFilter([row.data], response, maxValues);

        // If the row passes the filter, add it to the filtered data array
        if (passesFilter) {
          console.log(row.data);
          filteredData.push(row.data);
        }
      },
    });

    // Process the question using compromise

    return true;
  } catch (error) {
    console.error("An error occurred during the question processing:", error);
  }
}
function applyFilter(dataArray, filterObject) {
  // Apply filter criteria
  let results = dataArray.map((item) => {
    return filterObject.filterCriteria.every((criteria) => {
      switch (criteria.condition) {
        case "equals":
          return item[criteria.column] === criteria.value;
        case "greaterThan":
          return item[criteria.column] > criteria.value;
        case "lessThan":
          return item[criteria.column] < criteria.value;
        case "contains": // assuming the value is a string
          return item[criteria.column].includes(criteria.value);
        case "startsWith": // assuming the value is a string
          return item[criteria.column].startsWith(criteria.value);
        default:
          return false;
      }
    });
  });

  return results;
}

// Example usage:
// const filteredArray = filterData(yourDataArray, yourFilterObject);

export const use_ai = async (question, columns) => {
  console.log("calling api");
  const openaiApiKey = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({ apiKey: openaiApiKey });

  const example = {
    filterType: "and/or",
    conditions: [
      {
        field: "column_name",
        operator: "operator",
        value: "value",
      },
      {
        field: "column_name",
        operator: "operator",
        value: "value",
      },
      // Additional conditions if necessary
    ],
  };

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: JSON.stringify({ question: question, columns: columns }),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return JSON.parse(response.choices[0].message.content);
};
