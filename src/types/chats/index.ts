import {ITimestamp} from "../timestamp";
import {ICounterCommentsProps} from "../comments";

export interface ICreateUserChatProps {
    userId:string,
    interlocutorId:string,
    combinedId:string
}

export interface ICreateChatProps {
    userId:string,
    currentUserId:string
}


export interface IGetUserChatsrops {
    currentUserId:string
}

export interface ICheckChatProps {
    userId:string,
    currentUserId:string
}


export interface IChatUser {
    createUserChat:ITimestamp,
    id:string,
    interlocutorId:string,
    lastMessage:string,

}

export interface IGetUserChatProps {
    userChatId:string,
    currentUserId:string
}

export interface IAddMessageCombinedChatProps {
    combinedId: string,
    body:{
        text:string,
        userId:string
    }
}


export interface IGetMessagesCombinedChatProps {
    combinedId: string,
}

export interface IMessage {
    userId:string,
    text: string,
    pathImg?: string,
    createMessage: ITimestamp,
    id:string
}

export interface IGetTotalMessagesCombinedChatProps {
    combinedId: string,
}

export interface ISetTotalMessagesCombinedChatProps {
    combinedId: string,
    totalMessages: number
}


export interface IMessagesProps {
    combinedId: string,
    limitComment?: number,
    orderByComment: "desc" | "asc",
    startId?: ITimestamp
}