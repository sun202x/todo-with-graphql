import { loadQuery, usePreloadedQuery } from "react-relay";
import { OperationType } from "relay-runtime";
import RelayEnvironment from "../RelayEnvironment";
import graphql from "babel-plugin-relay/macro";

type Todo = {
    id: string;
    title: string;
    contents?: string;
    priority: number;
    done: boolean;
}

interface AllTodosType extends OperationType {
    response: {
        allTodos: Todo[];
    };
}

// Define a query
const AllTodosQuery = graphql`
    query useGetAllTodosAllTodosQuery {
        allTodos {
            id
            title
            contents
            priority
            done
        }
    }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery<AllTodosType>(RelayEnvironment, AllTodosQuery, {
    /* query variables */
});

const useGetAllTodos = () => {
    return usePreloadedQuery<AllTodosType>(AllTodosQuery, preloadedQuery);
};

export default useGetAllTodos;