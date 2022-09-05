

import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialState {
    open: boolean,
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info',
}
const initialState: IInitialState = {
    open: false,
    message: 'done',
    variant: 'success',
};

export const SnackBarsSlice = createSlice({
    name: 'snackBars',
    initialState,
    reducers: {
        setOpenSnack(state, action:PayloadAction<boolean>) {
            state.open = action.payload
        },
        setVariant(state, action:PayloadAction<'success' | 'error' | 'warning' | 'info'>) {
            state.variant = action.payload
        },
        setMessage(state, action:PayloadAction<string>) {
            state.message = action.payload
        },
    },

});

export const {setOpenSnack,setVariant,setMessage} = SnackBarsSlice.actions;

export default SnackBarsSlice.reducer;