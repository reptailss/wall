import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface IInitialState {

    email: null | string,
    token: null | string,
    id: string,
    isAuth: boolean,
    profile: {
        name: string,
        surname: string,
        dateBirth: number | null,
        city: string,
        jop: string,
        maritalStatus: string,
        timestamp:any,
        currentAvatar: string,
    },
    loadingProfile: boolean,
    totalFriends:{
        totalConfirm: number,
        totalOtherRequest: number,
        totalRequest: number,
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
        dateBirth:null,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp:{},
        currentAvatar: '',
    },
    loadingProfile: true,
    totalFriends:{
        totalConfirm: 0,
        totalOtherRequest: 0,
        totalRequest: 0,
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
            state.profile.currentAvatar = action.payload.currentAvatar;

        },

        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = '';
        },
        setLoadingProfile(state,action) {
            state.loadingProfile = action.payload.loadingProfile;
        },
        setTotalFriends(state, action) {
            state.totalFriends.totalConfirm = action.payload.totalConfirm;
            state.totalFriends.totalOtherRequest = action.payload.totalOtherRequest;
            state.totalFriends.totalRequest = action.payload.totalRequest;

        },

    },


});


export const {setUser, removeUser, setUserSliceProfile,setIsAuth,setLoadingProfile,setTotalFriends} = userSlice.actions;

export default userSlice.reducer;