import React from 'react';
import FriendsRequest from "../../containers/friends/friendsRequest/FriendsRequest";
import NavigateFriends from "../../containers/friends/navigateFriends/NavigateFriends";

const FriendsOtherRequestPage = () => {
    return (
        <>
            <NavigateFriends/>
            <FriendsRequest
            path={'otherRequest'}
            />
        </>

    )
};

export default FriendsOtherRequestPage;