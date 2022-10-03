import React, {FC, useEffect, useState} from 'react';
import {useChats} from "../../../../../hooks/useChats/useChats";
import {IMessage} from "../../../../../types/chats";
import {useAppSelector} from "../../../../../hooks/redux";
import CombinedChatItem from "./combinedChatItem/CombinedChatItem";

import styles from './styles.module.scss'


interface ICombinedChatListProps {
    messages: IMessage[]
}

const CombinedChatList:FC<ICombinedChatListProps> = ({messages}) => {



    const list = messages && messages?.map((item) =>{
        return <CombinedChatItem
            key={item.id}
            {...item}
        />
    });

    return (
        <div className={styles.list}>
            {list}
        </div>
    );
};

export default CombinedChatList;