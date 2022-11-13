import React from 'react';
import FriendsRequest from "../../containers/friends/friendsRequest/FriendsRequest";
import NavigateFriends from "../../containers/friends/navigateFriends/NavigateFriends";
import NewUsersSidebar from "../../containers/newUsers/newUsersSidebar/NewUsersSidebar";

const FriendsOtherRequestPage = () => {
    return (
        <>
            <NavigateFriends/>
            <NewUsersSidebar/>
            <FriendsRequest
            path={'otherRequest'}
            />
        </>

    )
};

export default FriendsOtherRequestPage;