



export interface IRibbonItem {
    type: 'updateAvatar' | 'addFriend' | 'photo' | 'post',
    text?:string,
    pathImg?: string[],
    userId:string,
    idRibbonContent:string,
    id?:string
}

export interface IAddRibbonItemProps {
    userId:string
    body:IRibbonItem,
    ribbonItemId:string
}

export interface IDeleteRibbonItemProps {
    userId:string,
    ribbonItemId:string
}

export interface IAddFriendRibbonItemProps {
    body:IRibbonItem,
    currentUserId:string,
    ribbonItemId:string
}


export interface IDeleteFriendRibbonItemProps {
    ribbonItemId:string,
    currentUserId:string
}

