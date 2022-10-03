import React from 'react';
import NavigateFriends from "../../containers/friends/navigateFriends/NavigateFriends";
import FriendsConfirmed from "../../containers/friends/friendsConfirmed/FriendsConfirmed";
import {useAppSelector} from "../../hooks/redux";

const FriendsConfirmedPage = () => {
    const{id} = useAppSelector(state => state.user);

    return (
        <div>
          <NavigateFriends/>
          <FriendsConfirmed
              myPage
              userId={id}/>
        </div>
    );
};

export default FriendsConfirmedPage;