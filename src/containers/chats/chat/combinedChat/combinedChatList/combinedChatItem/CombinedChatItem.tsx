import React, {FC} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import styles from "./styles.module.scss";
import {Typography} from "@mui/material";
import {IMessage} from "../../../../../../types/chats";
import {convertSecondstoDate, OptionsDateTimeComment} from "../../../../../../helpers/date";


const CombinedChatItem: FC<IMessage> = ({userId, text, createMessage}) => {
    const date = createMessage ? convertSecondstoDate(createMessage.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk', OptionsDateTimeComment).format(date);
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Link href={`/users/${userId}`}>
                    <LinkMU underline="none"
                            variant="caption"
                            component="div"
                            color="text.primary"
                            className={styles.link}>
                        {userId}
                    </LinkMU>
                </Link>
                <Typography
                    variant="caption"
                    color="text.other"
                    className={styles.text}>
                    {text}
                </Typography>
            </div>
            <Typography className={styles.date}
                        variant="caption"
            >{UAdate}</Typography>

        </div>
    );
};

export default CombinedChatItem;