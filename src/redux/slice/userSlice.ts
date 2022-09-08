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
    },
    profileOtherUser: {
        name: string,
        surname: string,
        dateBirth: number,
        city: string,
        jop: string,
        maritalStatus: string,
        timestamp:any,
    }
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
    },
    profileOtherUser: {
        name: '',
        surname: '',
        dateBirth: 0,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp:{},
    }
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

        },
        setUserSliceProfileOtherUser(state, action) {
            state.profileOtherUser.name = action.payload.name;
            state.profileOtherUser.surname = action.payload.surname;
            state.profileOtherUser.dateBirth = action.payload.dateBirth;
            state.profileOtherUser.city = action.payload.city;
            state.profileOtherUser.jop = action.payload.jop;
            state.profileOtherUser.maritalStatus = action.payload.maritalStatus;
            state.profileOtherUser.timestamp = action.payload.timestamp;

        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = '';
        },

    },


});


export const {setUser, removeUser, setUserSliceProfile,setUserSliceProfileOtherUser,setIsAuth} = userSlice.actions;

export default userSlice.reducer;