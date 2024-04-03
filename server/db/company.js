import { connection } from "./connection.js";

const getCompanyTable = () => connection.table("company");

export const getCompany = async (id) =>
  await getCompanyTable().first().where({ id });

export const addCompany = async (input) => {
  const company = {
    dateCreated: new Date().toISOString(),
    ...input,
  };

  await getCompanyTable().insert(company);

  return company;
};
