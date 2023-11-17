import { OpenAI } from "openai";
import { system_prompt } from "../prompt";

export const use_ai = async (columns) => {
  console.log("calling api");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // const response = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content: system_prompt,
  //     },
  //     {
  //       role: "user",
  //       content: JSON.stringify({ columns: columns }),
  //     },
  //   ],
  //   model: "gpt-3.5-turbo",
  // });

  // return JSON.parse(response.choices[0].message.content);

  return [
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
};
