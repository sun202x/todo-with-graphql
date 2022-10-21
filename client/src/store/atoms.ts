import { atom, atomFamily } from "recoil";

export const todoState = atomFamily({
    key: 'todoState',
    default: (id) => ({
        id: id,
        title: '',
        contents: '',
        priority: 1,
        done: false
    })
});

export const todoIdsState = atom<any[]>({
    key: 'todoIdsState',
    default: []
});