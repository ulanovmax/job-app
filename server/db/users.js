import { connection } from './connection.js';

const getUserTable = () => connection.table('user');

export const getUser = async (id) => await getUserTable().first().where({ id })

export const getUserByEmail = async (email) => await getUserTable().first().where({ email });
