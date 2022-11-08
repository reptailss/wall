

export interface ISearchProps {
    limitPeople: number,
    orderBySearch?:'asc' | 'desc',
    startId?:string,
}

export interface ISearchPeopleByLoginProps extends ISearchProps{
    userId:string,
}



export interface ISearchPeopleByProfileProps extends ISearchProps{

    maritalStatus: {
        active: boolean,
        value: string | false
    }

    login: {
        active: boolean,
        value: string | false
    },
    name: {
        active: boolean,
        value: string | false
    },
    city: {
        active: boolean,
        value: string | false
    },
    dateBirth: {
        active: boolean,
        of: false | number,
        to: false | number,


    },
    sex: {
        active: boolean,
        value: 'female' | 'male' | 'other' | string | false,
    },
}