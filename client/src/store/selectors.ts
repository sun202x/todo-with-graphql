import { selectorFamily } from "recoil";
import { todoIdsState, todoState } from "./atoms";

export const todosSelector = selectorFamily({
    key: 'todosSelector',
    get: (id) => ({ get }) => {
        const atom = get(todoState(id));
        return atom;
    },
    set: (id) => ({ set }, todo) => {
        set(todoState(id), todo);
        set(todoIdsState, prev => [ ...prev, id ]);
    } 
});