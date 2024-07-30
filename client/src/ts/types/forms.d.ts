import type { JobType, Maybe } from "@/apollo/generated/graphql.ts";

export interface JobFormType {
	title: string;
	selectedType: JobType | null;
	selectedLang: string | null;
	yearsNumber: number;
	description?: Maybe<string>;
}
