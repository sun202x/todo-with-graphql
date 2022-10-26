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

export const deleteTodoMutation = graphQLSelector({
    key: 'deleteTodoMutation',
    environment: environmentKey,
    query: (graphql`
        query queriesAfterDeleteQuery {
            allTodos {
                id,
                title
            }
        }
    ` as any).default,
    variables: {},
    mapResponse: data => data.allTodos,

    mutations: {
        mutation: graphql`
            mutation queriesDeleteTodoMutation($id: String!) {
                deleteTodo(id: $id)
            }
        `,
        variables: id => ({ id }),
    },
});

export const todoAddedSubscription = graphQLSelector({
    key: 'todoAddedSubscription',
    environment: environmentKey,
    query: (graphql`
        subscription queriesTodoAddedSubscription {
            todoAdded {
                id
                title
                contents
                priority
                done
            }
        }
    ` as any).default,
    variables: {},
    mapResponse: data => data.todoAdded,
});