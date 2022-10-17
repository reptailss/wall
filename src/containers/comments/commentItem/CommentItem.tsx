import React, {FC} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import styles from "./styles.module.scss";
import {Typography} from "@mui/material";
import {convertSecondstoDate, OptionsDateTimeComment} from "../../../helpers/date";
import {ITimestamp} from "../../../types/timestamp";


interface ICommentItemProps {
    authorNameComment:string,
    id: string
    text: string,
    timestamp:ITimestamp,
    showDate?:boolean
}

const CommentItem:FC<ICommentItemProps> = ({authorNameComment,id,text,timestamp,showDate}) => {
    const date = timestamp ? convertSecondstoDate(timestamp.seconds) : new Date();
    const UAdate = new Intl.DateTimeFormat('uk',OptionsDateTimeComment).format(date);
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Link href={`/users/${id}`}>
                    <LinkMU underline="none"
                            variant="caption"
                            component="div"
                            color="text.primary"
                            className={styles.link}>
                        {authorNameComment}
                    </LinkMU>
                </Link>
                <Typography
                    variant="caption"
                    color="text.other">
                    {text}
                </Typography>
            </div>
            {showDate &&  <Typography className={styles.date}
                                      variant="caption"
            >{UAdate}</Typography>}

        </div>
    );
};

export default CommentItem;