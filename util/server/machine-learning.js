"use server";

import { use_ai } from "./ai";

export async function process_question(columns) {
  try {
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
