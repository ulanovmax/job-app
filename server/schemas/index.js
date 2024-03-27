import { readFile } from "node:fs/promises";

async function combineTypeDefs(filePaths) {
  let combinedTypeDefs = "";

  for (const filePath of filePaths) {
    const typeDefsFromFile = await readFile(filePath, "utf-8");
    combinedTypeDefs += typeDefsFromFile + "\n"; // Добавляем перенос строки между файлами
  }

  return combinedTypeDefs;
}

const schemaFilePaths = [
  "./schemas/schema.graphql",
  "./schemas/job-schema.graphql",
  "./schemas/company-schema.graphql",
];

const typeDefs = await combineTypeDefs(schemaFilePaths);

export default typeDefs;
