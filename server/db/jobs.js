import { connection } from "./connection.js";

const getJobTable = () => connection.table("job");

export const getJobs = async () => await getJobTable().select();
