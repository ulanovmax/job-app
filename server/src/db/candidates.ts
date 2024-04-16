import { connection } from './connection.js';
import {generateId} from "./ids.js";
import {CandidateEntity} from "../ts/entities/candidate.entity.js";
import {CandidateCreateInput} from "../generated/shema.js";

const getCandidateTable = () => connection.table<CandidateEntity>('candidate');

export const getCandidate = async (id: string): Promise<CandidateEntity> => await getCandidateTable().first().where({ id })

export const getCandidateByEmail = async (email: string): Promise<CandidateEntity> => await getCandidateTable().first().where({ email });

export const addCandidate = async (input: CandidateCreateInput): Promise<CandidateEntity> => {
    const candidate: CandidateEntity = {
        id: generateId(),
        ...input,
    };

    await getCandidateTable().insert(candidate);

    return candidate;
};