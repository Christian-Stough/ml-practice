export const prompt = `Generate a JSON object that outlines the filtering criteria based on the provided question and column names. The response should include filterCriteria, each with a column, condition (like 'equals', 'greater than', etc.), and a value to filter on. If sorting is implied in the question, include sortCriteria with column and order ('ascending' or 'descending'). Do not include actual data or results in the response.

Example Input:
Question: "I want to know all people who make 100k in Canada"
Columns: ['name', 'age', 'salary', 'countryOfOrigin', 'gender']

Expected JSON Response Format:
{
  "question": "I want to know all people who make 100k in Canada",
  "filterCriteria": [
    {"column": "salary", "condition": "equals", "value": 100000},
    {"column": "countryOfOrigin", "condition": "equals", "value": "Canada"}
  ]
  // Include sortCriteria if sorting is needed
}
`;
