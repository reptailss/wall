import {useAppDispatch} from "../redux";
import {setMessage, setOpenSnack, setVariant} from '../../redux/slice/snackBarsSlice'


export const useSnackBar = () => {
    const dispatch = useAppDispatch();
    const setSnackBar = (message: string, variant: 'success' | 'error' | 'warning' | 'info') => {
        dispatch(setMessage(message));
        dispatch(setVariant(variant));
        dispatch(setOpenSnack(true));
    };

    return {setSnackBar}

};