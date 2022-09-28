import React, {useEffect, useState} from 'react';
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useAppSelector} from "../../../hooks/redux";
import {IFriendItem} from "../../../types/friends";
import FriendItemRequest from "./friendItemRequest/FriendItemRequest";
import SpinnerBlock from "../../../components/spinner/Spinner";



const FriendsRequest = () => {

    const{getFriendsRequestUsers,
        loadingGetFriendsRequestUsers,
    } = useFriends();
    const {id} = useAppSelector(state => state.user);

    const [friends,setFriends] = useState<IFriendItem[]>();

    useEffect(()=>{
       if(id){
           onGetFriendsRequestUsers();
       }
    },[id]);
    const onGetFriendsRequestUsers = async () => {

       const res = await getFriendsRequestUsers({
            currentUserId:id
        });
      //@ts-ignore
        setFriends(res);
    };



    const friendsList = friends && friends.map((item)=>{
        return <FriendItemRequest
            onChangeFriend={onGetFriendsRequestUsers}
            key={item.id}
            {...item}/>
    });

    return (
       <div>
           {loadingGetFriendsRequestUsers ? <SpinnerBlock/> : friendsList}
       </div>
    )
};

export default FriendsRequest;