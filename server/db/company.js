import { connection } from "./connection.js";
import {generateId} from "./ids.js";

const getCompanyTable = () => connection.table("company");

export const getCompany = async (id) =>
  await getCompanyTable().first().where({ id });

export const getCompanyByEmail = async (email) => await getCompanyTable().first().where({ email });

export const addCompany = async (input) => {
  const company = {
    id: generateId(),
    dateCreated: new Date().toISOString(),
    ...input,
  };

  await getCompanyTable().insert(company);

  return company;
};
