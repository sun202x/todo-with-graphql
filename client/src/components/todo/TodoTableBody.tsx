import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, Link, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useSetRecoilState } from "recoil";
import { currentEditIdState, deleteTodoMutation, dialogOpenState } from "../../store";
import useAllTodosSelector from "./hooks/useAllTodosSelector";

type TodoTableBodyProps = {

};

const TodoTableBody = (props: TodoTableBodyProps) => {
    const allTodos = useAllTodosSelector();
    const setOpen = useSetRecoilState(dialogOpenState);
    const setCurrentEditId = useSetRecoilState(currentEditIdState);
    const deleteTodo = useSetRecoilState(deleteTodoMutation);

    const getTodoId = (el: HTMLElement) => {
        const target = el.closest<HTMLElement>('[data-id]');
        return target?.dataset.id;
    }

    const handleOpenRegister = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const id = getTodoId(event.currentTarget);
        if (id) {
            setOpen(true);
            setCurrentEditId(id);
        }
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = getTodoId(event.currentTarget);

        if (id) {
            const result = (window as any).confirm('Delete todo?');
            result && deleteTodo(id);
        }
    }

    return (
        <TableBody>
            {allTodos?.map(({ id, title, contents, priority, done }) => (
                <TableRow key={id} data-id={id}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={done}
                            // onChange={}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Link href="#" underline="none" onClick={handleOpenRegister}>
                            {title}
                        </Link>
                    </TableCell>
                    <TableCell align="left">{contents}</TableCell>
                    <TableCell align="right">{priority}</TableCell>
                    <TableCell align="center">
                        <IconButton aria-label='delete' onClick={handleDelete}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default React.memo(TodoTableBody);