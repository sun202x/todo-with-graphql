import { Checkbox, Link, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { allTodosQuery } from "../../store";

type TodoTableBodyProps = {

};

const TodoTableBody = (props: TodoTableBodyProps) => {
    const allTodos = useRecoilValue(allTodosQuery);

    const handleOpenRegister = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    return (
        <TableBody>
            {allTodos.map(({ id, title, contents, priority, done }) => (
                <TableRow key={id}>
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
                </TableRow>
            ))}
        </TableBody>
    );
}

export default React.memo(TodoTableBody);