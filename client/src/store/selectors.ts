import { selector } from "recoil";

export const allTodosState = selector({
    key: 'allTodosState',
    get: ({get}) => {
        // const text = get(todoState);

        // return text.length;
        return [];
    },    
});