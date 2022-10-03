
import Badge from '@mui/material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import {FC} from "react";
import React from "react";

interface IFriendsBtnStateProps {
    firnedsUnmout: number
}
const FriendsBtnState:FC<IFriendsBtnStateProps> = ({firnedsUnmout}) => {

    return (
        <>

            <Badge badgeContent={firnedsUnmout} color="primary">
                <PeopleIcon
                    fontSize="large"/>
            </Badge>
        </>
    );
};

export default FriendsBtnState;