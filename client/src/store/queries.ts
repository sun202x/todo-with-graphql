import graphql from "babel-plugin-relay/macro";
import { graphQLSelector, graphQLSelectorFamily } from "recoil-relay";
import { environmentKey } from "../RelayEnvironment";

export type Todo = {
    id?: string;
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

type AddTodoVariableType = {
    input: Todo;
};
export const addTodoMutation = graphQLSelectorFamily<{ id: string }, string, Todo, AddTodoVariableType>({
    key: 'addTodoMutation',
    environment: environmentKey,
    query: (graphql`
        query queriesTodoQuery($id: String!) {
            todo(id: $id) {
                id
                title
                contents
                priority
                done
            }
        }
    ` as any).default,
    variables: (id) => ({ id }),
    mapResponse: data => data.allTodos,

    mutations: {
        mutation: graphql`
            mutation queriesAddTodoMutation($input: TodoInput!) {
                addTodo(input: $input) {
                    id
                    title
                    contents
                }
            }
        `,
        variables: todo => ({
            input: {
                title: todo.title,
                contents: todo.contents,
                done: todo.done,
                priority: todo.priority
            }
        }),
    },
});

// const allTodosSubscription = graphQLSelector({
//     key: 'allTodosSubscription',
//     environment: environmentKey,
//     query: graphql`
//       subscription UserSubscription($id: ID!) {
//         user(id: $id) {
//           name
//           address
//         }
//       }
//     `,
//     variables: ({ get }) => ({ id: get(currentIDAtom) }),
//     mapResponse: data => data.user,
// });