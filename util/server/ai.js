import { OpenAI } from "openai";
import { system_prompt } from "../prompt";

export const use_ai = async (columns) => {
  console.log("calling api");

  return await api_call(columns);

  //return get_test_data();
};

const api_call = async (columns) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: system_prompt,
      },
      {
        role: "user",
        content: JSON.stringify({ columns: columns }),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return JSON.parse(response.choices[0].message.content);
};

const get_test_data = () => [
  {
    type: "bar",
    title: "Population by Country",
    desc: "A bar graph showing the population of each country",
    "y-data": "Population (millions)",
    "x-data": "Country",
    "x-sort-filter": "desc",
    "x-average": false,
  },
  {
    type: "bar",
    title: "HDI by Region",
    desc: "A bar graph showing the Human Development Index (HDI) of different regions",
    "y-data": "HDI",
    "x-data": "Region",
    "x-sort-filter": "asc",
    "x-average": true,
  },
  {
    type: "bar",
    title: "GDP per Capita by Country",
    desc: "A bar graph showing the GDP per Capita of each country",
    "y-data": "GDP per Capita",
    "x-data": "Country",
    "x-sort-filter": "desc",
    "x-average": false,
  },
  {
    type: "bar",
    title: "Ecological Footprint by Country",
    desc: "A bar graph showing the total ecological footprint of each country",
    "y-data": "Total Ecological Footprint",
    "x-data": "Country",
    "x-sort-filter": "desc",
    "x-average": false,
  },
  {
    type: "bar",
    title: "Forest Land by Country",
    desc: "A bar graph showing the forest land area of each country",
    "y-data": "Forest Land",
    "x-data": "Country",
    "x-sort-filter": "desc",
    "x-average": false,
  },
];

//[
//   {
//     type: "bar",
//     title: "Top 10 Channels by Watch Time",
//     desc: "This graph shows the top 10 channels with the highest watch time in minutes.",
//     "y-data": "Watch time(Minutes)",
//     "x-data": "Channel",
//     "x-sort-filter": "desc",
//     "x-average": false,
//   },
//   {
//     type: "bar",
//     title: "Average Viewers per Channel",
//     desc: "This graph displays the average viewers per channel.",
//     "y-data": "Average viewers",
//     "x-data": "Channel",
//     "x-sort-filter": "desc",
//     "x-average": false,
//   },
//   {
//     type: "bar",
//     title: "Top 10 Channels by Followers Gained",
//     desc: "This graph shows the top 10 channels with the most followers gained.",
//     "y-data": "Followers gained",
//     "x-data": "Channel",
//     "x-sort-filter": "desc",
//     "x-average": false,
//   },
//   {
//     type: "bar",
//     title: "Languages by Total Stream Time",
//     desc: "This graph represents the total stream time for each language.",
//     "y-data": "Stream time(minutes)",
//     "x-data": "Language",
//     "x-sort-filter": "desc",
//     "x-average": false,
//   },
//   {
//     type: "bar",
//     title: "Average Stream Time by Partnered Status",
//     desc: "This graph compares the average stream time between partnered and non-partnered channels.",
//     "y-data": "Stream time(minutes)",
//     "x-data": "Partnered",
//     "x-sort-filter": "asc",
//     "x-average": true,
//   },
// ];
