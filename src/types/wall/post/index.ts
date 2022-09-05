import {ITimestamp} from "../../timestamp";


export interface IWallPostItem extends IWallPostBodyItem{
    timestamp: ITimestamp,
    id: string

}

export interface IWallPostBodyItem {
    text: string,
    pathImg?: string[],
    authorName: string,
    authorId: string,

}


export interface IWallAddProps {
    id: string,
    body: IWallPostBodyItem,
}




export interface IWallRemoveProps {
    idUser: string ,
    idPost: string,
}

