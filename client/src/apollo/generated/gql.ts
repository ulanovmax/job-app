/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tmutation CreateCandidate($input: CandidateCreateInput!) {\n\t\tcandidate: createCandidate(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n": types.CreateCandidateDocument,
    "\n\tmutation CreateCompany($input: CompanyCreateInput!) {\n\t\tcompany: createCompany(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.CreateCompanyDocument,
    "\n\tmutation CreateJob($input: JobCreateInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n": types.CreateJobDocument,
    "\n\tquery GetCandidate($id: ID!) {\n\t\tcandidate(id: $id) {\n\t\t\tname\n\t\t\temail\n\t\t\tenglishLevel\n\t\t\tid\n\t\t\tyears\n\t\t}\n\t}\n": types.GetCandidateDocument,
    "\n\tquery GetCompany($companyId: ID!, $jobsLimit: Int) {\n\t\tcompany(id: $companyId) {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\tcountry\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\temployees\n\t\t\tjobs(limit: $jobsLimit) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateCreated\n\t\t\t\t\tdescription\n\t\t\t\t\ttype\n\t\t\t\t\tresponses\n\t\t\t\t\tcountry\n\n\t\t\t\t\trequirements {\n\t\t\t\t\t\tenglishLevel\n\t\t\t\t\t\tyears\n\t\t\t\t\t}\n\n\t\t\t\t\tcompany {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t}\n\t}\n": types.GetCompanyDocument,
    "\n\tquery getJobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\ttitle\n\t\t\t\tid\n\t\t\t\tcountry\n\t\t\t\tresponses\n\t\t\t\ttype\n\t\t\t\tdescription\n\t\t\t\tdateCreated\n\n\t\t\t\trequirements {\n\t\t\t\t\tyears\n\t\t\t\t\tenglishLevel\n\t\t\t\t}\n\n\t\t\t\tcompany {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\n\t\t\ttotalCount\n\t\t}\n\t}\n": types.GetJobsDocument,
    "\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\ttype\n\t\t\tresponses\n\t\t\tcountry\n\n\t\t\trequirements {\n\t\t\t\tenglishLevel\n\t\t\t\tyears\n\t\t\t}\n\n\t\t\tcompany {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.GetJobDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateCandidate($input: CandidateCreateInput!) {\n\t\tcandidate: createCandidate(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateCandidate($input: CandidateCreateInput!) {\n\t\tcandidate: createCandidate(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateCompany($input: CompanyCreateInput!) {\n\t\tcompany: createCompany(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateCompany($input: CompanyCreateInput!) {\n\t\tcompany: createCompany(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateJob($input: JobCreateInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateJob($input: JobCreateInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCandidate($id: ID!) {\n\t\tcandidate(id: $id) {\n\t\t\tname\n\t\t\temail\n\t\t\tenglishLevel\n\t\t\tid\n\t\t\tyears\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCandidate($id: ID!) {\n\t\tcandidate(id: $id) {\n\t\t\tname\n\t\t\temail\n\t\t\tenglishLevel\n\t\t\tid\n\t\t\tyears\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCompany($companyId: ID!, $jobsLimit: Int) {\n\t\tcompany(id: $companyId) {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\tcountry\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\temployees\n\t\t\tjobs(limit: $jobsLimit) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateCreated\n\t\t\t\t\tdescription\n\t\t\t\t\ttype\n\t\t\t\t\tresponses\n\t\t\t\t\tcountry\n\n\t\t\t\t\trequirements {\n\t\t\t\t\t\tenglishLevel\n\t\t\t\t\t\tyears\n\t\t\t\t\t}\n\n\t\t\t\t\tcompany {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCompany($companyId: ID!, $jobsLimit: Int) {\n\t\tcompany(id: $companyId) {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\tcountry\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\temployees\n\t\t\tjobs(limit: $jobsLimit) {\n\t\t\t\titems {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateCreated\n\t\t\t\t\tdescription\n\t\t\t\t\ttype\n\t\t\t\t\tresponses\n\t\t\t\t\tcountry\n\n\t\t\t\t\trequirements {\n\t\t\t\t\t\tenglishLevel\n\t\t\t\t\t\tyears\n\t\t\t\t\t}\n\n\t\t\t\t\tcompany {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery getJobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\ttitle\n\t\t\t\tid\n\t\t\t\tcountry\n\t\t\t\tresponses\n\t\t\t\ttype\n\t\t\t\tdescription\n\t\t\t\tdateCreated\n\n\t\t\t\trequirements {\n\t\t\t\t\tyears\n\t\t\t\t\tenglishLevel\n\t\t\t\t}\n\n\t\t\t\tcompany {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\n\t\t\ttotalCount\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery getJobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\ttitle\n\t\t\t\tid\n\t\t\t\tcountry\n\t\t\t\tresponses\n\t\t\t\ttype\n\t\t\t\tdescription\n\t\t\t\tdateCreated\n\n\t\t\t\trequirements {\n\t\t\t\t\tyears\n\t\t\t\t\tenglishLevel\n\t\t\t\t}\n\n\t\t\t\tcompany {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\n\t\t\ttotalCount\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\ttype\n\t\t\tresponses\n\t\t\tcountry\n\n\t\t\trequirements {\n\t\t\t\tenglishLevel\n\t\t\t\tyears\n\t\t\t}\n\n\t\t\tcompany {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdateCreated\n\t\t\tdescription\n\t\t\ttype\n\t\t\tresponses\n\t\t\tcountry\n\n\t\t\trequirements {\n\t\t\t\tenglishLevel\n\t\t\t\tyears\n\t\t\t}\n\n\t\t\tcompany {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;