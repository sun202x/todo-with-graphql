import { Checkbox, Link, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useSetRecoilState } from "recoil";
import { currentEditIdState, dialogOpenState } from "../../store";
import useAllTodosSelector from "./hooks/useAllTodosSelector";

type TodoTableBodyProps = {

};

const TodoTableBody = (props: TodoTableBodyProps) => {
    const allTodos = useAllTodosSelector();
    const setOpen = useSetRecoilState(dialogOpenState);
    const setCurrentEditId = useSetRecoilState(currentEditIdState);

    const handleOpenRegister = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const id = event.currentTarget.dataset.id;
        if (id) {
            setOpen(true);
            setCurrentEditId(id);
        }
    }

    return (
        <TableBody>
            {allTodos?.map(({ id, title, contents, priority, done }) => (
                <TableRow key={id}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={done}
                        // onChange={}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Link href="#" underline="none" data-id={id} onClick={handleOpenRegister}>
                            {title}
                        </Link>
                    </TableCell>
                    <TableCell align="left">{contents}</TableCell>
                    <TableCell align="right">{priority}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default React.memo(TodoTableBody);