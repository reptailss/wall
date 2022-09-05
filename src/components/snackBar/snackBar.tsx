import * as React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setOpenSnack} from '../../redux/slice/snackBarsSlice'

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBars = () => {

    const {open,message,variant} = useAppSelector(state => state.snackBars);

    const dispath = useAppDispatch();

    const setOpen = (value:boolean) =>{
        dispath(setOpenSnack(value))
    };


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default SnackBars;