



export interface IRibbonItem {
    type: 'updateAvatar' | 'addFriend' | 'photo' | 'post',
    text?:string,
    pathImg?: string[],
    userId:string,
    idRibbonContent:string,
    id:string
}

export interface IAddRibbonItemProps {
    userId:string
    body:IRibbonItem
}
export interface IAddFriendRibbonItemProps {
    body:IRibbonItem,
    currentUserId:string
}