import {ICounterCommentsProps} from "../comments";

export interface IUpdateCurrentAvatarProps {
    id: string,
    pathImg: string
}

export interface IGetAvatarsCollection {
    id: string
}

export interface IAvatarItem {
    id: string,
    pathImg: string
}
export interface IDeleteAvatarsCollection {
    idUser:string,
    idAvatar:string
}

export interface ICounterAvatarsProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
}

export interface ISetAvatarsCommentsProps extends ICounterAvatarsProps {
    totalAvatars: number
}
