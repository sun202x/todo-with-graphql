import { RequestParameters, Variables } from "relay-runtime";

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(params: RequestParameters, variables: Variables) {
    const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;

    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: params.text,
            variables,
        }),
    });

    // Get the response as JSON
    const json = await response.json();

    // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
    // property of the response. If any exceptions occurred when processing the request,
    // throw an error to indicate to the developer what went wrong.
    if (Array.isArray(json.errors)) {
        console.log(json.errors);
        throw new Error(
            `Error fetching GraphQL query '${params.name
            }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
                json.errors
            )}`
        );
    }

    // Otherwise, return the full payload.
    return json;
}

export default fetchGraphQL;