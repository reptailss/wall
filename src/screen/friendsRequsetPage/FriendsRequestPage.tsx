import React from 'react';
import FriendsRequest from "../../containers/friends/friendsRequest/FriendsRequest";
import NavigateFriends from "../../containers/friends/navigateFriends/NavigateFriends";

const FriendsRequestPage = () => {
    return (
        <>
            <NavigateFriends/>
            <FriendsRequest/>
        </>

    )
};

export default FriendsRequestPage;