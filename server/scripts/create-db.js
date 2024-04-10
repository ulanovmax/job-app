import { connection } from "../db/connection.js";
import knex from "knex";

const { schema } = connection;

await schema.dropTableIfExists("candidate");
await schema.dropTableIfExists("job");
await schema.dropTableIfExists("company");

await schema.createTable("company", (table) => {
  table.text("id").notNullable().primary();
  table.text("dateCreated");
  table.text("name").notNullable();
  table.text("email").notNullable().unique();
  table.text("country").notNullable();
  table.integer("employees").notNullable();
  table.text("password").notNullable();
  table.text("description");
});

const langLevels = [
  "Beginner",
  "Pre Intermediate",
  "Intermediate",
  "Upper Intermediate",
  "Advanced",
  "Proficient",
];

await schema.createTable("job", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("title").notNullable();
  table.text("description");
  table.text("dateCreated").notNullable();
  table.text("country").notNullable();
  table.enu("type", ["Office", "Remote"]).notNullable();
  table.integer("responses");
  table.json("requirements").notNullable();
});

await schema.createTable("candidate", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("email").notNullable().unique();
  table.integer("years").notNullable();
  table.enu("englishLevel", langLevels).notNullable();
  table.text("password").notNullable();
});

// await connection.table("company").insert([
//   {
//     id: "FjcJCHJALA4i",
//     name: "Gotoinc",
//     description:
//       "Our mission is to launch, and upscale software businesses with our proven workflow and effective collaboration. We believe that optimal digital solutions for everyday hassles allow humanity to focus more on matters of global importance.",
//     country: "Ukraine",
//   },
// ]);
//
// await connection.table('user').insert([
//   {
//     id: 'AcMJpL7b413Z',
//     companyId: 'FjcJCHJALA4i',
//     email: 'ulanov.work@gmail.com',
//     password: 'gotoinc2024',
//   },
// ]);

process.exit();
