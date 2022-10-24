import { selectorFamily } from "recoil";
import { allTodosQuery } from "./queries";

export const todoDataSelector = selectorFamily({
    key: 'todoDataSelector',
    get: (id: string) => ({ get }) => {
        const allTodos = get(allTodosQuery);
        return allTodos.find(({ id: _id }) => _id === id);
    }
});