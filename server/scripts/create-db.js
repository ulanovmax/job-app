import { connection } from "../db/connection.js";

const { schema } = connection;

await schema.dropTableIfExists("job");
await schema.dropTableIfExists("company");

await schema.createTable("company", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("description");
  table.text("country").notNullable();
});

await schema.createTable("job", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("title").notNullable();
  table.text("description");
  table.text("dateCreated").notNullable();
  table.text("country").notNullable();
  table.enu("type", ["Office", "Remote"]);
  table.integer("responses");
  table.json("requirements").notNullable();
});

await connection.table("company").insert([
  {
    id: "FjcJCHJALA4i",
    name: "Gotoinc",
    description:
      "Our mission is to launch, and upscale software businesses with our proven workflow and effective collaboration. We believe that optimal digital solutions for everyday hassles allow humanity to focus more on matters of global importance.",
    country: "Ukraine",
  },
]);

process.exit();
