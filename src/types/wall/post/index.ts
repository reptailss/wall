import {ITimestamp} from "../../timestamp";


export interface IWallPostBodyItem {
    text: string,
    pathImg?: string[],
    authorName: string,
    authorId: string,
    idUserWhoseWall: string,
    type?: string,
    idAvatar?:string,

}


export interface IWallPostItem extends IWallPostBodyItem{
    timestamp: ITimestamp,
    id: string,
    totalCommments: number,
    type?: string,

}


export interface IWallAddProps {
    id: string,
    body: IWallPostBodyItem,
    idPost:string
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

