import {ITimestamp} from "../timestamp";

export interface IUserProfile {
    name:  string,
    surname: string,
    dateBirth: number,
    city:  string,
    jop: string,
    maritalStatus: string,
    timestamp? :ITimestamp,

}

export interface IUpdateUserProfileProps {
    id: string,
    body: {
        name: string,
        surname: string,
        dateBirth: number,
        city: string,
        jop: string,
        maritalStatus: string,
    },
    snack?: boolean
}