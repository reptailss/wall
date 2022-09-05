
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalMU from '@mui/material/Modal';
import {FC, ReactNode, useState} from "react";
import MoreHorizIcon from "../menu/Menu";
import React from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IModalProps {
    children: ReactNode,
    button?: ReactNode,
}

const Modal:FC<IModalProps> = ({children,button})=> {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const btn = button ? button :  <div>відкрити</div>;

    return (
        <div>
            <Button onClick={handleOpen}>{btn}</Button>
            <ModalMU
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>

            </ModalMU>
        </div>
    );
};

export default Modal;