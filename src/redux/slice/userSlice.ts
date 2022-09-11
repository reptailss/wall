import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface IInitialState {

    email: null | string,
    token: null | string,
    id: string,
    isAuth: boolean,
    profile: {
        name: string,
        surname: string,
        dateBirth: number,
        city: string,
        jop: string,
        maritalStatus: string,
        timestamp:any,
        currentAvatar: string
    },

}

const initialState: IInitialState = {
    email: null,
    token: null,
    id: 'id',
    isAuth: false,
    profile: {
        name: '',
        surname: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp:{},
        currentAvatar: ''
    },

};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload;

        },
        setUserSliceProfile(state, action) {
            state.profile.name = action.payload.name;
            state.profile.surname = action.payload.surname;
            state.profile.dateBirth = action.payload.dateBirth;
            state.profile.city = action.payload.city;
            state.profile.jop = action.payload.jop;
            state.profile.maritalStatus = action.payload.maritalStatus;
            state.profile.timestamp = action.payload.timestamp;
            state.profile.currentAvatar = action.payload.currentAvatar;

        },

        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = '';
        },

    },


});


export const {setUser, removeUser, setUserSliceProfile,setIsAuth} = userSlice.actions;

export default userSlice.reducer;