import React, {FC, useEffect, useState} from 'react';
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useAppSelector} from "../../../hooks/redux";
import {IFriendItem} from "../../../types/friends";
import FriendItemRequest from "./friendItemRequest/FriendItemRequest";
import SpinnerBlock from "../../../components/spinner/Spinner";

import NotItems from "../../../components/notItems/NotItems";

interface IFriendsRequestProps {
    path: 'otherRequest' | 'myRequest'

}

const FriendsRequest:FC<IFriendsRequestProps> = ({path}) => {

    const{getFriendsRequestUsers,
        loadingGetFriendsRequestUsers,
    } = useFriends();
    const {id,totalFriends} = useAppSelector(state => state.user);

    const [friends,setFriends] = useState<IFriendItem[]>();

    useEffect(()=>{
       if(id){
           onGetFriendsRequestUsers();
       }
    },[id,totalFriends,path]);
    const onGetFriendsRequestUsers = async () => {
       const res = await getFriendsRequestUsers({
            currentUserId:id,
           path
        });
      //@ts-ignore
        setFriends(res);
    };



    const friendsList = friends && friends.length && friends.map((item)=>{
        return <FriendItemRequest
            path={path}
            key={item.id}
            {...item}/>
    });

    return (
       <div>
           {loadingGetFriendsRequestUsers ? <SpinnerBlock/> : friends && friends.length ? friendsList :
           <NotItems
               mt
               text={' у вас немає заявок'}
           />}
       </div>
    )
};

export default FriendsRequest;