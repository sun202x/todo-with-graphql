import { graphQLSelector } from "recoil-relay";
import graphql from "babel-plugin-relay/macro";
import { environmentKey } from "../RelayEnvironment";

export type Todo = {
    id: string;
    title: string;
    contents?: string;
    priority: number;
    done: boolean;
}

export const allTodosQuery = graphQLSelector<{}, Todo[]>({
    key: 'allTodosQuery',
    environment: environmentKey,
    query: (graphql`
        query queriesAllTodosQuery {
            allTodos {
                id
                title
                contents
                priority
                done
            }
        }
    ` as any).default,
    variables: {},
    mapResponse: data => data.allTodos,
});