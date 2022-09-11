
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalMU from '@mui/material/Modal';
import {FC, ReactNode, useState} from "react";
import React from "react";






interface IModalProps {
    children: ReactNode,
    button?: ReactNode,
    fullWidthButton?: boolean,
    fullScreenModal?: boolean
}

const Modal:FC<IModalProps> = ({children,button,fullWidthButton,fullScreenModal})=> {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const btn = button ? button :  <div>відкрити</div>;

    const styleFullWidth ={
        width: fullWidthButton ? '100%' : 'auto'
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: fullScreenModal ? '80vw' : 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height:fullScreenModal ? '80vh' : 'auto'
    };

    return (
        <div>
            <Button
                style={styleFullWidth}
                onClick={handleOpen}>{btn}</Button>
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