



export interface IEvent {
    type: 'updateAvatar' | 'addFriend',
    text:string,
    pathImg:string,
    userId:string
}

export interface IAddEventProps {
    currentUserId: string,
    userId:string
    body:IEvent
}