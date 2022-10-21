import {
    Paper,
    Table, TableContainer
} from '@mui/material';
import React, { ReactNode } from 'react';
import TodoTableBody from './TodoTableBody';
import TodoTableHead from './TodoTableHead';

type TodoTableProps = {
    children: ReactNode;
};

const TodoTableBase = React.memo((props: TodoTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {props.children}
            </Table>
        </TableContainer>
    );
});

const TodoTable = Object.assign(TodoTableBase, {
    Head: TodoTableHead,
    Body: TodoTableBody
});

export default TodoTable;