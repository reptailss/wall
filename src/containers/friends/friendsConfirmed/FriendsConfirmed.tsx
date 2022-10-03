import React, {FC, useEffect, useState} from 'react';
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useAppSelector} from "../../../hooks/redux";
import {IFriendItem} from "../../../types/friends";
import FriendItemConfirmed from "./friendItemConfirmed/FriendItemConfirmed";
import SpinnerBlock from "../../../components/spinner/Spinner";
import NotFriends from "../notFriends/NotFriends";

interface IFriendsConfirmedProps {
    userId:string,
    myPage?:boolean,
}

const FriendsConfirmed:FC<IFriendsConfirmedProps> = ({userId,myPage}) => {

    const {totalFriends} = useAppSelector(state => state.user);

    const{getFriendsConfirmedUsers,
        loadingGetFriendsConfirmedUsers,
    } = useFriends();

    const [friends,setFriends] = useState<IFriendItem[]>();

    useEffect(()=>{
       if(userId){
           onGetFriendsConfirmedUsers();
       }
    },[userId,totalFriends]);
    const onGetFriendsConfirmedUsers = async () => {

       const res = await getFriendsConfirmedUsers({
           userId
        });
      //@ts-ignore
        setFriends(res);
    };



    const friendsList = friends && friends.map((item)=>{
        return <FriendItemConfirmed
            myPage={myPage}
            key={item.id}
            {...item}/>
    });

    return (
       <div>


           {loadingGetFriendsConfirmedUsers ? <SpinnerBlock/> : friends && friends.length ? friendsList :
               <NotFriends
                   text={'у вас немає друзів'}
               />}
       </div>
    )
};

export default FriendsConfirmed;