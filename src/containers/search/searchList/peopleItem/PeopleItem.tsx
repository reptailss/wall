import React, {FC} from 'react';
import {IUserProfile} from "../../../../types/profile";
import {Avatar, Paper, Typography} from "@mui/material";
import styles from "./styles.module.scss";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import AddMessageBtn from "../../../chats/addMessageBtn/AddMessageBtn";
import {convertSecondstoDate,getCurrentAge} from "../../../../helpers/date";
import AddFriendBtn from "../../../friends/addFriendBtn/AddFriendBtn";


const PeopleItem: FC<IUserProfile> = ({name, currentAvatar, id, dateBirth}) => {


    const years = dateBirth ? getCurrentAge(dateBirth) : null;


    return (
        <Paper className={styles.root}>
            <div className={styles.info}>
                <Link href={`users/${id}`}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Avatar
                            className={styles.avatar}
                            alt="avatar"
                            src={currentAvatar}
                        />
                    </LinkMU>
                </Link>
                <Link href={`users/${id}`}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Typography
                            className={styles.name}
                            variant="body2" color="text.primary"
                        >
                            {id ? id : <SkeletonText/>}
                        </Typography>

                        <Typography
                            className={styles.name}
                            variant="caption" color="text.other"
                        >
                            {years ? <div>
                                {years}
                            </div> : <SkeletonText/>}

                        </Typography>
                    </LinkMU>
                </Link>
            </div>
            <div className={styles.sidebar}>
                <div className={styles.messages}>
                    {id && <AddMessageBtn userId={id}/>}
                </div>

                {id && <AddFriendBtn
                    userId={id}
                />}
            </div>

        </Paper>
    );
};

export default PeopleItem;