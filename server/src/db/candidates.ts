import { connection } from './connection.js';
import {generateId} from "./ids.js";

const getCandidateTable = () => connection.table('candidate');

export const getCandidate = async (id: string) => await getCandidateTable().first().where({ id })

export const getCandidateByEmail = async (email: string) => await getCandidateTable().first().where({ email });

export const addCandidate = async (input) => {
    const candidate = {
        id: generateId(),
        ...input,
    };

    await getCandidateTable().insert(candidate);

    return candidate;
};