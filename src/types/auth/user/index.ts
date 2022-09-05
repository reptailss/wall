export interface IPropsLoginUser {
    email: string,
    password: string
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

export interface IUserProfile {
    name:  string,
    surname: string,
    dateBirth: number,
    city:  string,
    jop: string,
    maritalStatus: string,
}