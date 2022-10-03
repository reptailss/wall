import React from 'react';
import FriendsRequest from "../../containers/friends/friendsRequest/FriendsRequest";
import NavigateFriends from "../../containers/friends/navigateFriends/NavigateFriends";

const FriendsMyRequestPage = () => {
    return (
        <>
            <NavigateFriends/>
            <FriendsRequest
            path={'myRequest'}
            />
        </>

    )
};

export default FriendsMyRequestPage;