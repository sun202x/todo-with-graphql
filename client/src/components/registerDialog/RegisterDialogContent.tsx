import { DialogContent, DialogContentText, Grid, Slider, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Todo } from "../../store";

type RegisterDialogContentProps = {
    todo: Todo;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSliderChange: (event: any, newValue: number | number[]) => void;
};

const RegisterDialogContent = (props: RegisterDialogContentProps) => {
    const {
        title,
        contents,
        priority
    } = props.todo;

    return (
        <DialogContent sx={{ overflow: 'hidden' }}>
            <DialogContentText>
                Todo를 입력하세요.
            </DialogContentText>
            <Grid container spacing={6} direction="column">
                <Grid item>
                    <TextField
                        value={title}
                        onChange={props.handleTitleChange}
                        margin="dense"
                        id="title"
                        label="Title"
                        variant="standard"
                        fullWidth
                    />
                    <TextField
                        value={contents}
                        onChange={props.handleContentsChange}
                        margin="dense"
                        id="contents"
                        label="Contents"
                        minRows={5}
                        multiline
                        fullWidth
                    />
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item xs={2}>
                        <DialogContentText>Priority</DialogContentText>
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            value={priority}
                            onChange={props.handleSliderChange}
                            defaultValue={1}
                            valueLabelDisplay="on"
                            step={1}
                            marks
                            min={1}
                            max={5}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    );
}

export default React.memo(RegisterDialogContent);