import { atom, atomFamily } from "recoil";
import { Todo } from "./queries";

export const todoState = atom<Todo>({
    key: 'todoState',
    default: {
        id: '',
        title: '',
        contents: '',
        priority: 1,
        done: false
    }
});

export const dialogOpenState = atom({
    key: 'dialogOpenState',
    default: false
});

export const currentEditIdState = atom<string>({
    key: 'currentEditIdState',
    default: ''
});