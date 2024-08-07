import {GraphQLError} from "graphql/error/index.js";

export const unauthorizedError = () => {
    return new GraphQLError("Unauthorized", {
        extensions: {
            code: "UNAUTHORIZED"
        }
    })
}

export const companyNotFoundError = () => {
    return new GraphQLError("Company is not found", {
        extensions: {
            code: "COMPANY_NOT_FOUND",
        }
    })
}

export const candidateNotFoundError = () => {
    return new GraphQLError("Candidate is not found", {
        extensions: {
            code: "CANDIDATE_NOT_FOUND",
        }
    })
}

export const jobNotFoundError = () => {
    return new GraphQLError("Job is not found", {
        extensions: {
            code: "JOB_NOT_FOUND",
        }
    })
}

export const noPermissionError = () => {
    return new GraphQLError("You have no permission for this operation", {
        extensions: {
            code: "NO_PERMISSION"
        }
    })
}