import {GraphQLError} from "graphql/error/index.js";

export const unauthorizedError = () => {
    return new GraphQLError("Unauthorized", {
        extensions: {
            code: "UNAUTHORIZED"
        }
    })
}