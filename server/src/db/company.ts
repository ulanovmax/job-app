import { connection } from "./connection.ts";
import {generateId} from "./ids.ts";
import {CompanyEntity} from "../ts/entities/company.entity.js";
import {CompanyCreateInput} from "../generated/shema.js";

const getCompanyTable = () => connection.table<CompanyEntity>("company");

export const getCompany = async (id: string): Promise<CompanyEntity> =>
  await getCompanyTable().first().where({ id });

export const getCompanyByEmail = async (email: string): Promise<CompanyEntity> => await getCompanyTable().first().where({ email });

export const addCompany = async (input: CompanyCreateInput) => {
  const company: CompanyEntity = {
    id: generateId(),
    dateCreated: new Date().toISOString(),
    ...input,
  };

  await getCompanyTable().insert(company);

  return company;
};
