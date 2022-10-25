import { useEffect } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addTodoMutation, Todo, todoDataSelector, todoState } from "../../../store";

type ReturnType = [
    Todo, 
    React.Dispatch<React.SetStateAction<Todo>>,
    SetterOrUpdater<Todo>
];

const useTodoState = (id: string): ReturnType => {
    const todoData = useRecoilValue(todoDataSelector(id));
    const addTodo = useSetRecoilState(addTodoMutation(id));
    const [todo, setTodo] = useRecoilState(todoState);

    useEffect(() => {
        const data = todoData ? todoData : todo;
        setTodo({ ...data, id });
    }, [id]);

    return [todo, setTodo, addTodo];
}

export default useTodoState;