import { connection } from "./connection.ts";
import {generateId} from "./ids.ts";

const getCompanyTable = () => connection.table("company");

export const getCompany = async (id: string) =>
  await getCompanyTable().first().where({ id });

export const getCompanyByEmail = async (email: string) => await getCompanyTable().first().where({ email });

export const addCompany = async (input) => {
  const company = {
    id: generateId(),
    dateCreated: new Date().toISOString(),
    ...input,
  };

  await getCompanyTable().insert(company);

  return company;
};
