import { useRecoilCallback, useRecoilValue } from "recoil";
import { allTodosQuery } from "../../../store";

const useAllTodosSelector = () => {
    const allTodos = useRecoilValue(allTodosQuery);

    const fetchAllTodos = useRecoilCallback(({ snapshot, set }) => () => {
        snapshot.getLoadable(allTodosQuery);
    });

    fetchAllTodos();

    return allTodos;
}

export default useAllTodosSelector;