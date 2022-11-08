export const dataSelectSort = [{value: 'asc', title: 'Popular'}, {value: 'desc', title: 'Rating'}];
export const dataSelectFavoriteSort = [{value: 'created_at.asc', title: 'Created at asc'}, {
    value: 'created_at.desc',
    title: 'Created at desc'
}];
export const dataSelectMaritalStatus = [
    {value: false, title: 'неважливо'},
    {value: 'married', title: 'одружений(-а)'},
    {value: 'notMarried', title: 'не одружий(-а)'},
    {value: 'ActivelyLooking', title: 'в активному пошуку'},


];

export const dataSelectSex = [
    {value: '', title: 'неважливо'},
    {value: 'female', title: 'жіноча'},
    {value: 'male', title: 'чоловіча'},
    {value: 'other', title: 'інша'},

];

interface IItemTypeButton {
    value: string | boolean,
    title: string
}

export const searchTypeButton: IItemTypeButton[] = [
    {value: 'city', title: 'місто'},
    {value: 'name', title: 'імя'},
    {value: 'dateBirth', title: 'дата народження'},
    {value: 'maritalStatus', title: 'сімейний статус'},
    {value: 'login', title: 'логін'},
    {value: 'sex', title: 'стать'},
];


export const dataSelectDateBirth = [
    {
        value: ''
        , title: 'неважливо'
    },
    {
        value: {
            of: 3355,
            to: 25555,
        }
        , title: '0-10'
    },
    {
        value: {
            of: 3355,
            to: 25555,
        },
        title: '10-18'
    },
    {
        value: {
            of: 3355,
            to: 25555,
        }
        , title: '18-30'
    },
    {
        value: {
            of: 3355,
            to: 25555,
        },
        title: '30-99'
    },

];
