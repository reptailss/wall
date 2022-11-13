import {ITimestamp} from "../timestamp";

export interface ISearchProps {
    limitPeople: number,
    orderBySearch?: 'asc' | 'desc',
    startId?: ITimestamp,
}

export interface ISearchPeopleByLoginProps extends ISearchProps {
    userId: string,
}


export interface ISearchPeopleByProfileProps extends ISearchProps {

    maritalStatus: {
        value: string | false,
        title: string,
    }

    login: {
        value: string | false,
    },
    name: {
        value: string | false,
    },
    city: {
        value: string | false,
    },
    dateBirth: {
        of: false | number,
        to: false | number,
        title: string,


    },
    sex: {
        value: 'female' | 'male' | 'other' | string | false,
    },
}