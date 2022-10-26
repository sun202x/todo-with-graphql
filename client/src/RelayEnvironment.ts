// your-app-name/src/RelayEnvironment.js
import { createClient } from 'graphql-ws';
import { EnvironmentKey } from 'recoil-relay';
import { Environment, GraphQLResponse, Network, Observable, RecordSource, RequestParameters, Store, Variables } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

const wsClient = createClient({
    url: 'ws://localhost:3000',
});

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchQuery(params: RequestParameters, variables: Variables) {
    console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
    return await fetchGraphQL(params, variables);
}

function subscribe(operation: RequestParameters, variables: Variables) {
    return Observable.create<GraphQLResponse>((sink) => {
        return wsClient.subscribe(
            {
                operationName: operation.name,
                query: operation.text as string,
                variables,
            },
            sink as any,
        );
    });
}

export const environmentKey = new EnvironmentKey('RelayEnvironment');

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
    network: Network.create(fetchQuery, subscribe),
    store: new Store(new RecordSource()),
});