import {ITimestamp} from "../timestamp";


export interface IMutationCommentProps extends ICommentsProps {
    idCurrentUser: string
}
export interface IComment {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
}

export interface ICommentsProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
    limitComment: number,
    orderByComment: "desc" | "asc"
}

export interface IAddCommentProps extends IComment{
    authorNameComment: string,
    text: string,

}

export interface ICommentItem {
    authorNameComment: string,
    id: string,
    text: string,
    timestamp:ITimestamp,
}
export interface ICounterCommentsProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
}
export interface ISetCounterCommentsProps extends ICounterCommentsProps {
    totalComments: number
}
