import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../../store/atoms";
import RegisterDialogContent from "./RegisterDialogContent";

type RegisterDialogProps = {
    open?: boolean;
    onClose?: (event: any, reason?: "backdropClick" | "escapeKeyDown") => void;
};

const RegisterDialog = (props: RegisterDialogProps) => {
    const _id = useRef(Date.now());
    const [todo, setTodo] = useRecoilState(todoState(_id.current));

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
        const priority = Array.isArray(newValue) ? newValue[0] : newValue;
        setTodo({
            ...todo,
            priority
        });
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(todo);
        debugger;
    }

    return (
        <Dialog
            open={props.open ?? false}
            onClose={props.onClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle>Todo 작성</DialogTitle>
            <RegisterDialogContent 
                handleTitleChange={handleTitleChange}
                handleContentsChange={handleContentsChange}
                handleSliderChange={handleSliderChange}
            />
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleRegister} color="primary">
                    등록
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default React.memo(RegisterDialog);