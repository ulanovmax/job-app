import { connection } from "../db/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("job");

await schema.createTable("job", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("title").notNullable();
  table.text("description");
  table.text("dateCreated").notNullable();
  table.text("country").notNullable();
  table.text("type").notNullable();
});

await connection.table("job").insert([
  {
    id: "f3YzmnBZpK0o",
    companyId: "FjcJCHJALA4i",
    title: "Frontend Developer",
    description: "We are looking for a Frontend Developer familiar with React.",
    dateCreated: "2024-03-25T12:00:00.000Z",
    country: "Ukraine",
    type: "office",
  },
]);

process.exit();
