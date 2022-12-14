





export interface IMutationLikeProps extends ILikesProps {
    idCurrentUser: string
}

export interface ILikesProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
}

export interface IAddLikeProps extends IMutationLikeProps{
    authorNameLike: string
}

export interface ILikeItem {
    authorNameLike: string,
    id: string
}
export interface ICounterCommentsProps extends ILikesProps{
    totalLikes: number
}

export interface IGetLikesProps {
    idUser: string,
    pathRoot: string,
    pathItemId : string,
    limitLikes: number,
    orderByLikes: "desc" | "asc"
}