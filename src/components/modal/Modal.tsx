import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalMU from '@mui/material/Modal';
import React, {FC, ReactNode, useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton} from '@mui/material'
import styles from "../../containers/wall/wallPostAdd/addImagePost/styles.module.scss";
import ClearIcon from "../../containers/wall/wallPostAdd/addImagePost/AddImagePost";
import {motion} from "framer-motion";
import useMedia from "../../hooks/useMedia/useMedia";


interface IModalProps {
    children: ReactNode,
    button?: ReactNode,
    fullWidthButton?: boolean,
    fullScreenModal?: boolean,
    closeModal?: boolean,
    openModal?: boolean
    notButton?: boolean,
    width?: string,
    height?: string,
    padding?: string,
    buttonClose?: boolean,
}

const Modal: FC<IModalProps> = ({children, button, fullWidthButton, fullScreenModal, closeModal, openModal, notButton, width, height, padding, buttonClose}) => {



    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (closeModal) {
            handleClose();
        }
    }, [closeModal]);

    useEffect(() => {
        if (openModal) {
            handleOpen();
        }
    }, [openModal]);


    const btn = button ? button : <div>відкрити</div>;

    const styleFullWidth = {
        width: fullWidthButton ? '100%' : width ? width : 'auto',
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: fullScreenModal ? '95vw' : width ? width : 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: fullScreenModal ? '95vh' : '85vh',
        padding: padding ? padding : '32px'
    };

    return (
        <div>
            {notButton ? null : <Button
                style={styleFullWidth}
                onClick={handleOpen}>{btn}</Button>}
            <ModalMU
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className={styles.root}
                    sx={style}>
                    {buttonClose ?
                        <IconButton
                            onClick={handleClose}
                            size="small"
                            className={styles.iconClose}
                            aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        : null}
                    {children}
                </Box>

            </ModalMU>
        </div>
    );
};

export default Modal;