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
        maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string,
        timestamp: any,
        currentAvatar: string,
        status: string,
        sex: 'female' | 'male' | 'other' | string,
    },
    loadingProfile: boolean,
    totalFriends: {
        totalConfirm: number,
        totalOtherRequest: number,
        totalMyRequest: number,
    },

    searchParams: {
        maritalStatus: {
            title: string,
            value: string | false
        },
        login: {
            value: string | false
        },
        name: {
            value: string | false
        },
        city: {
            value: string | false
        },
        dateBirth: {
            title: string,
            of: false | number,
            to: false | number,


        },
        sex: {
            title: string,
            value: 'female' | 'male' | 'other' | string | false,
        },
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
        dateBirth: null,
        city: '',
        jop: '',
        maritalStatus: '',
        timestamp: {},
        currentAvatar: '',
        status: '...',
        sex: '',
    },
    loadingProfile: true,
    totalFriends: {
        totalConfirm: 0,
        totalOtherRequest: 0,
        totalMyRequest: 0,
    },

    searchParams: {
        maritalStatus: {
            title: 'неважливо',
            value: false,
        },
        city: {
            value: ''
        },
        name: {
            value: ''
        },
        login: {
            value: ''
        },
        dateBirth: {
            title: 'неважливо',
            of: false,
            to: false
        },

        sex: {
            title: 'неважливо',
            value: false
        },
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
            state.profile.status = action.payload.status;
            state.profile.sex = action.payload.sex;

        },

        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = '';
        },
        setLoadingProfile(state, action) {
            state.loadingProfile = action.payload.loadingProfile;
        },
        setTotalFriends(state, action) {
            state.totalFriends.totalConfirm = action.payload.totalConfirm;
            state.totalFriends.totalOtherRequest = action.payload.totalOtherRequest;
            state.totalFriends.totalMyRequest = action.payload.totalMyRequest;

        },


        setParamsSex(state, action) {
            state.searchParams.sex.value = action.payload
        },
        setParamsMaritalStatus(state, action) {
            state.searchParams.maritalStatus.value = action.payload
        },
        setParamsCity(state, action) {
            state.searchParams.city.value = action.payload
        },
        setParamsName(state, action) {
            state.searchParams.name.value = action.payload
        },
        setParamsLogin(state, action) {
            state.searchParams.login.value = action.payload
        },

        setParamsDateBirth(state, action) {
            state.searchParams.dateBirth.to = action.payload.to;
            state.searchParams.dateBirth.of = action.payload.of
        },

        setParamsTitleSex(state, action) {
            state.searchParams.sex.title = action.payload
        },
        setParamsTitleMaritalStatus(state, action) {
            state.searchParams.maritalStatus.title = action.payload
        },

        setParamsTitleDateBirth(state, action) {
            state.searchParams.dateBirth.title = action.payload;
        },



    },


});


export const {
    setUser,
    removeUser,
    setUserSliceProfile,
    setIsAuth,
    setLoadingProfile,
    setTotalFriends,
    setParamsSex,
    setParamsLogin,
    setParamsCity,
    setParamsMaritalStatus,
    setParamsName,
    setParamsDateBirth,
    setParamsTitleSex,
    setParamsTitleMaritalStatus,
    setParamsTitleDateBirth


} = userSlice.actions;

export default userSlice.reducer;