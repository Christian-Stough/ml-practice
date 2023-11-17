"use server";

import fs from "fs/promises";
import path from "path";

export async function add_picture_url_to_json(url) {
  console.log(__dirname);
  const filePath = path.join(__dirname, "../../../util", "pictures.json");
  const data = await fs.readFile(filePath, "utf-8");
  const pictures = JSON.parse(data);
  pictures.push(url);
  await fs.writeFile(filePath, JSON.stringify(pictures));
  return true;
}
