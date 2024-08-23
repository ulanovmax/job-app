import { GraphQLResolveInfo } from 'graphql';
import { CompanyEntity } from './src/ts/entities/company.entity';
import { JobEntity, JobList, ResponseEntity } from './src/ts/entities/job.entity';
import { CandidateEntity } from './src/ts/entities/candidate.entity';
import { MessageEntity, ChatEntity } from './src/ts/entities/chat.entity';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  savedJobs: JobList;
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

/** Types for chat */
export type Chat = {
  dateCreated: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sender: User;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type Message = {
  chat: Chat;
  dateCreated: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sender: User;
  text: Scalars['ID']['output'];
};

export type Mutation = {
  addMessage?: Maybe<Message>;
  addResponse?: Maybe<Response>;
  addSavedJob?: Maybe<Array<Scalars['ID']['output']>>;
  createCandidate?: Maybe<Candidate>;
  createCompany?: Maybe<Company>;
  createJob?: Maybe<Job>;
  deleteJob?: Maybe<Job>;
  removeSavedJob?: Maybe<Array<Scalars['ID']['output']>>;
  updateJob?: Maybe<Job>;
};


export type MutationAddMessageArgs = {
  chatId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddResponseArgs = {
  jobId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddSavedJobArgs = {
  candidateId: Scalars['ID']['input'];
  jobId: Scalars['ID']['input'];
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


export type MutationDeleteJobArgs = {
  companyId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationRemoveSavedJobArgs = {
  candidateId: Scalars['ID']['input'];
  jobId: Scalars['ID']['input'];
};


export type MutationUpdateJobArgs = {
  companyId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  input: JobCreateInput;
};

export type Query = {
  candidate?: Maybe<Candidate>;
  chats: Array<Chat>;
  company?: Maybe<Company>;
  job?: Maybe<Job>;
  jobs: JobList;
  messages: Array<Message>;
  response: Array<Response>;
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


export type QueryMessagesArgs = {
  chatId: Scalars['ID']['input'];
};


export type QueryResponseArgs = {
  jobId: Scalars['ID']['input'];
};

export type Response = {
  candidateId: Scalars['String']['output'];
  dateCreated: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobId: Scalars['String']['output'];
};

export type Subscription = {
  messageAdded?: Maybe<Message>;
};

export type User = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Candidate: ResolverTypeWrapper<CandidateEntity>;
  CandidateCreateInput: CandidateCreateInput;
  Chat: ResolverTypeWrapper<ChatEntity>;
  Company: ResolverTypeWrapper<CompanyEntity>;
  CompanyCreateInput: CompanyCreateInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Job: ResolverTypeWrapper<JobEntity>;
  JobCreateInput: JobCreateInput;
  JobList: ResolverTypeWrapper<JobList>;
  JobRequirements: ResolverTypeWrapper<JobRequirements>;
  JobRequirementsInput: JobRequirementsInput;
  JobType: JobType;
  Message: ResolverTypeWrapper<MessageEntity>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<ResponseEntity>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Candidate: CandidateEntity;
  CandidateCreateInput: CandidateCreateInput;
  Chat: ChatEntity;
  Company: CompanyEntity;
  CompanyCreateInput: CompanyCreateInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Job: JobEntity;
  JobCreateInput: JobCreateInput;
  JobList: JobList;
  JobRequirements: JobRequirements;
  JobRequirementsInput: JobRequirementsInput;
  Message: MessageEntity;
  Mutation: {};
  Query: {};
  Response: ResponseEntity;
  String: Scalars['String']['output'];
  Subscription: {};
  User: User;
};

export type CandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Candidate'] = ResolversParentTypes['Candidate']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  englishLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  experience?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  savedJobs?: Resolver<ResolversTypes['JobList'], ParentType, ContextType>;
  years?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employees?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobs?: Resolver<ResolversTypes['JobList'], ParentType, ContextType, Partial<CompanyJobsArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  requirements?: Resolver<Maybe<ResolversTypes['JobRequirements']>, ParentType, ContextType>;
  responses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['JobType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobListResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobList'] = ResolversParentTypes['JobList']> = {
  items?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobRequirementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['JobRequirements'] = ResolversParentTypes['JobRequirements']> = {
  englishLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  years?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationAddMessageArgs, 'chatId' | 'text'>>;
  addResponse?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationAddResponseArgs, 'jobId' | 'text'>>;
  addSavedJob?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType, RequireFields<MutationAddSavedJobArgs, 'candidateId' | 'jobId'>>;
  createCandidate?: Resolver<Maybe<ResolversTypes['Candidate']>, ParentType, ContextType, RequireFields<MutationCreateCandidateArgs, 'input'>>;
  createCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'input'>>;
  createJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationCreateJobArgs, 'input'>>;
  deleteJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationDeleteJobArgs, 'companyId' | 'id'>>;
  removeSavedJob?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType, RequireFields<MutationRemoveSavedJobArgs, 'candidateId' | 'jobId'>>;
  updateJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationUpdateJobArgs, 'companyId' | 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  candidate?: Resolver<Maybe<ResolversTypes['Candidate']>, ParentType, ContextType, RequireFields<QueryCandidateArgs, 'id'>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<QueryCompanyArgs, 'id'>>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<QueryJobArgs, 'id'>>;
  jobs?: Resolver<ResolversTypes['JobList'], ParentType, ContextType, Partial<QueryJobsArgs>>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'chatId'>>;
  response?: Resolver<Array<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<QueryResponseArgs, 'jobId'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  candidateId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageAdded?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageAdded", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Candidate?: CandidateResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  JobList?: JobListResolvers<ContextType>;
  JobRequirements?: JobRequirementsResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

