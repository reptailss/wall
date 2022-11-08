import {ITimestamp} from "../timestamp";

export interface IUserProfile {
    name:  string,
    dateBirth: number | null,
    city:  string,
    jop: string,
    maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string,
    timestamp? :ITimestamp,
    currentAvatar: string,
    uid?:string
    status:string,
    sex: 'female' | 'male' | 'other' | string,
    id?:string

}



export interface IUpdateUserProfileProps {
    id: string,
    body: {
        name: string,
        dateBirth: number,
        city: string,
        jop: string,
        maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string,
        currentAvatar: string,
        uid:string,
        status?:string,
        sex: 'female' | 'male' | 'other' | string,
    },
    snack?: boolean
}


export interface IUpUserProfileProps {
    id: string,
    body: {
        dateBirth?: number,
        city?: string,
        jop?: string,
        maritalStatus?: string,
        name?: string,
        status?:string,

    },
    snack?: boolean
}

