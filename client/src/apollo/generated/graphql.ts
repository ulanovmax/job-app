/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Types for candidate */
export type Candidate = {
  email: Scalars['String']['output'];
  englishLevel: Scalars['String']['output'];
  experience: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  years: Scalars['Int']['output'];
};

export type CandidateCreateInput = {
  email: Scalars['String']['input'];
  englishLevel: Scalars['String']['input'];
  experience: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  years: Scalars['Int']['input'];
};

/** Types for company */
export type Company = {
  country: Scalars['String']['output'];
  dateCreated: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  employees: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  jobs: JobList;
  name: Scalars['String']['output'];
};


/** Types for company */
export type CompanyJobsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyCreateInput = {
  country: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  employees: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Types for job */
export type Job = {
  company: Company;
  country: Scalars['String']['output'];
  dateCreated: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  requirements?: Maybe<JobRequirements>;
  responses: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: JobType;
};

/** Arguments for creating job */
export type JobCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<JobRequirementsInput>;
  title: Scalars['String']['input'];
  type?: InputMaybe<JobType>;
};

export type JobList = {
  items: Array<Job>;
  totalCount: Scalars['Int']['output'];
};

export type JobRequirements = {
  englishLevel: Scalars['String']['output'];
  years: Scalars['Int']['output'];
};

export type JobRequirementsInput = {
  englishLevel: Scalars['String']['input'];
  years: Scalars['Int']['input'];
};

export enum JobType {
  Office = 'Office',
  Remote = 'Remote'
}

export type Mutation = {
  createCandidate?: Maybe<Candidate>;
  createCompany?: Maybe<Company>;
  createJob?: Maybe<Job>;
};


export type MutationCreateCandidateArgs = {
  input: CandidateCreateInput;
};


export type MutationCreateCompanyArgs = {
  input: CompanyCreateInput;
};


export type MutationCreateJobArgs = {
  input: JobCreateInput;
};

export type Query = {
  candidate?: Maybe<Candidate>;
  company?: Maybe<Company>;
  job?: Maybe<Job>;
  jobs: JobList;
};


export type QueryCandidateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCandidateMutationVariables = Exact<{
  input: CandidateCreateInput;
}>;


export type CreateCandidateMutation = { candidate?: { id: string, name: string, email: string } | null };

export type CreateCompanyMutationVariables = Exact<{
  input: CompanyCreateInput;
}>;


export type CreateCompanyMutation = { company?: { id: string, name: string } | null };

export type CreateJobMutationVariables = Exact<{
  input: JobCreateInput;
}>;


export type CreateJobMutation = { job?: { id: string, title: string } | null };

export type GetCandidateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCandidateQuery = { candidate?: { name: string, experience: string, email: string, englishLevel: string, id: string, years: number } | null };

export type GetCompanyQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  jobsLimit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCompanyQuery = { company?: { id: string, email: string, name: string, country: string, dateCreated: string, description?: string | null, employees: number, jobs: { totalCount: number, items: Array<{ id: string, title: string, dateCreated: string, description?: string | null, type: JobType, responses: number, country: string, requirements?: { englishLevel: string, years: number } | null, company: { name: string, id: string } }> } } | null };

export type GetJobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetJobsQuery = { jobs: { totalCount: number, items: Array<{ title: string, id: string, country: string, responses: number, type: JobType, description?: string | null, dateCreated: string, requirements?: { years: number, englishLevel: string } | null, company: { name: string, id: string } }> } };

export type GetJobQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetJobQuery = { job?: { id: string, title: string, dateCreated: string, description?: string | null, type: JobType, responses: number, country: string, requirements?: { englishLevel: string, years: number } | null, company: { name: string, id: string } } | null };


export const CreateCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidateCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"candidate"},"name":{"kind":"Name","value":"createCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateCandidateMutation, CreateCandidateMutationVariables>;
export const CreateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"company"},"name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const CreateJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"job"},"name":{"kind":"Name","value":"createJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateJobMutation, CreateJobMutationVariables>;
export const GetCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"englishLevel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"years"}}]}}]}}]} as unknown as DocumentNode<GetCandidateQuery, GetCandidateQueryVariables>;
export const GetCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"employees"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"responses"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"englishLevel"}},{"kind":"Field","name":{"kind":"Name","value":"years"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetCompanyQuery, GetCompanyQueryVariables>;
export const GetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"responses"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"englishLevel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetJobsQuery, GetJobsQueryVariables>;
export const GetJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"responses"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"englishLevel"}},{"kind":"Field","name":{"kind":"Name","value":"years"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetJobQuery, GetJobQueryVariables>;