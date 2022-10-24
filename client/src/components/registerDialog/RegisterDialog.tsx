import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import useTodoState from "./hooks/useTodoState";
import RegisterDialogContent from "./RegisterDialogContent";

type RegisterDialogProps = {
    id?: string;
    open?: boolean;
    onClose?: (event: any, reason?: "backdropClick" | "escapeKeyDown") => void;
};

const RegisterDialog = (props: RegisterDialogProps) => {
    const [id, setId] = useState('');
    const [todo, setTodo] = useTodoState(id);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            title: event.target.value
        });
    }
    const handleContentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            contents: event.target.value
        });
    }
    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setTodo({
            ...todo,
            priority: Array.isArray(newValue) 
                ? newValue[0] 
                : newValue
        });
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        debugger;
        props.onClose?.({});
    }

    useEffect(() => {
        if (props.open === true) {
            setId(props.id || Date.now().toString());
        }

    }, [props.open]);

    return (
        <Dialog
            open={props.open ?? false}
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle>Todo 작성</DialogTitle>
            <RegisterDialogContent
                todo={todo} 
                handleTitleChange={handleTitleChange}
                handleContentsChange={handleContentsChange}
                handleSliderChange={handleSliderChange}
            />
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleRegister} color="primary">
                    {props.id ? '수정' : '등록'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default React.memo(RegisterDialog);