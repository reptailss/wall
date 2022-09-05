
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

import {configureStore, createSlice, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';

import theme from './slice/themeSlice'
import user from './slice/userSlice'
import snackBars from './slice/snackBarsSlice'


const makeStore = () =>
    configureStore({
        reducer: {
            theme,user,snackBars
        },
    });

const store = configureStore({
    reducer: {
        theme,user,snackBars
    },
});


export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


export const wrapper = createWrapper<RootStore>(makeStore);


export default store;