import {ITimestamp} from "../timestamp";

export interface IUserProfile {
    name:  string,
    surname: string,
    dateBirth: number,
    city:  string,
    jop: string,
    maritalStatus: string,
    timestamp? :ITimestamp,
    currentAvatar: string

}

export interface IUpdateUserProfileProps {
    id: string,
    body: {
        name: string,
        dateBirth: number,
        city: string,
        jop: string,
        maritalStatus: string,
        currentAvatar: string
    },
    snack?: boolean
}