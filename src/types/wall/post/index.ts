import {ITimestamp} from "../../timestamp";


export interface IWallPostBodyItem {
    text: string,
    pathImg?: string[],
    authorName: string,
    authorId: string,
    idUserWhoseWall: string

}


export interface IWallPostItem extends IWallPostBodyItem{
    timestamp: ITimestamp,
    id: string,
    totalCommments: number

}


export interface IWallAddProps {
    id: string,
    body: IWallPostBodyItem,
}


export interface IWallRemoveProps {
    idUser: string ,
    idPost: string,
}


export interface IWallPostMutationProps {
    idUser: string,
    idPost: string,

}

export interface IAddLikePostProps extends IWallPostMutationProps{
    idCurrentUser: string
}

