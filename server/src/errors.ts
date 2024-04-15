import {GraphQLError} from "graphql/error/index.js";

export const unauthorizedError = () => {
    return new GraphQLError("Unauthorized", {
        extensions: {
            code: "UNAUTHORIZED"
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