import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Todo, todoDataSelector, todoState } from "../../../store";

type ReturnType = [
    Todo, 
    React.Dispatch<React.SetStateAction<Todo>>
];

const useTodoState = (id: string): ReturnType => {
    const todoData = useRecoilValue(todoDataSelector(id));
    const [todo, setTodo] = useRecoilState(todoState);

    useEffect(() => {
        todoData && setTodo(todoData);
    }, [id]);

    return [todo, setTodo];
}

export default useTodoState;