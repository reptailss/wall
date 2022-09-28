export interface IFriendsRequestProps {
    userId:string,
    currentUserId:string
}
export interface IGetFriendsRequestProps {
    currentUserId:string
}
export interface IFriendItem {
    id: string,
    friend: boolean
}


export interface IFriendsParams{
    props:IFriendsRequestProps,
    snack: boolean,
    path: 'otherRequest' | 'myRequest'
}

export interface IFriendsParamsReverse extends IFriendsParams{
    reverse?: boolean
}


export interface ICounterFriendsProps {
    userId: string,
}
export interface ISetCounterFriendsProps extends ICounterFriendsProps {
    body: any
}

