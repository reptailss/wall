import { createSlice, PayloadAction} from '@reduxjs/toolkit'



interface IInitialState {

    themeMode: 'dark' | 'light'
}

const initialState:IInitialState = {
  themeMode: 'dark'
};



export const themeSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setThemeMode(state, action) {
            state.themeMode = action.payload
        },

    },





});


export const {setThemeMode} = themeSlice.actions;

export default themeSlice.reducer;