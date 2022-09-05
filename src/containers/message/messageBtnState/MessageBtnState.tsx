
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {FC} from "react";

interface IMessageBtnStateProps {
    messageUnmout?: number
}
const MessageBtnState:FC<IMessageBtnStateProps> = ({messageUnmout=4}) => {

    return (
        <>

            <Badge badgeContent={messageUnmout} color="primary">
                <MailIcon  fontSize="large" color="action" />
            </Badge>
        </>
    );
};

export default MessageBtnState;