import { connection } from "./connection.js";

const getCompanyTable = () => connection.table("company");

export const getCompany = async (id) => getCompanyTable().first().where({ id });
