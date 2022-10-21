import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import React, { useState } from "react";
import RegisterDialog from "../registerDialog";

type FooterProps = {

}

const FooterBase = styled('div')`
    position: relative;
`;

const Footer = (props: FooterProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((open) => !open);
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
                onClose={handleOpen}
            />
        </FooterBase>
    );
}

export default React.memo(Footer);