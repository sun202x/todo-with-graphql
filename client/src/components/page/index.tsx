import { Box } from "@mui/material";
import React from "react";
import Footer from "../footer";
import TodoTable from "../todo/TodoTable";

const TodoPage = (props: any) => {

    return (
        <Box padding="2rem">
            <TodoTable>
                <TodoTable.Head />
                <TodoTable.Body />
            </TodoTable>
            <Footer />
        </Box>
    );
}

export default React.memo(TodoPage);