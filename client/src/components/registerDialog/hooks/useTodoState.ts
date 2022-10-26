import { useEffect } from "react";
import { Resetter, SetterOrUpdater, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { addTodoMutation, Todo, todoDataSelector, todoState } from "../../../store";

type ReturnType = [
    Todo, 
    React.Dispatch<React.SetStateAction<Todo>>,
    Resetter,
    SetterOrUpdater<Todo>
];

const useTodoState = (id: string): ReturnType => {
    const todoData = useRecoilValue(todoDataSelector(id));
    const addTodo = useSetRecoilState(addTodoMutation(id));
    const resetTodo = useResetRecoilState(todoState);
    const [todo, setTodo] = useRecoilState(todoState);

    useEffect(() => {
        const data = todoData ? todoData : todo;
        setTodo({ ...data, id });
    }, [id]);

    return [todo, setTodo, resetTodo, addTodo];
}

export default useTodoState;