import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { currentEditIdState, dialogOpenState } from "../../store";
import RegisterDialog from "../registerDialog";

type FooterProps = {

}

const FooterBase = styled('div')`
    position: relative;
`;

const Footer = (props: FooterProps) => {
    const [open, setOpen] = useRecoilState(dialogOpenState);
    const [currentEditId, setCurrentEditId] = useRecoilState(currentEditIdState);

    const handleOpen = () => {
        setOpen((open) => !open);

        if (open === true) {
            setCurrentEditId('');
        }
    }

    return (
        <FooterBase>
            <Fab
                sx={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    "&:hover": {
                        backgroundColor: "#6666ff"
                    }
                }}
                onClick={handleOpen}
                color="primary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
            <RegisterDialog
                open={open}
                id={currentEditId}
                onClose={handleOpen}
            />
        </FooterBase>
    );
}

export default React.memo(Footer);