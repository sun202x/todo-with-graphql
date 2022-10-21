import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

type TodoTableHead = {

};

const TodoTableHead = (props: TodoTableHead) => {

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    // checked={}
                    // onChange={}
                    />
                </TableCell>
                <TableCell align="center">
                    <TableSortLabel
                        active={false}
                    // direction={order === 'asc' ? 'desc' : 'asc'}
                    // onClick={}
                    >
                        Title
                    </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                    <TableSortLabel
                        active={false}
                    // direction={order === 'asc' ? 'desc' : 'asc'}
                    // onClick={}
                    >
                        Contents
                    </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                    <TableSortLabel
                        active={false}
                    // direction={order === 'asc' ? 'desc' : 'asc'}
                    // onClick={}
                    >
                        Priority
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default React.memo(TodoTableHead);