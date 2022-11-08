import React, {FC, useEffect, useState} from 'react';
import {useUsers} from "../../../../hooks/useUser/UseUser";
import {IUserProfile} from "../../../../types/profile";
import {Avatar, Paper, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "./styles.module.scss";
import {IFriendItem} from "../../../../types/friends";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import {useAppSelector} from "../../../../hooks/redux";
import {useFriends} from "../../../../hooks/useFriends/useFriends";
import AddMessageBtn from "../../../chats/addMessageBtn/AddMessageBtn";
import {convertSecondstoDate} from "../../../../helpers/date";
import AddFriendBtn from "../../../friends/addFriendBtn/AddFriendBtn";





const PeopleItem:FC<IUserProfile> = ({name,currentAvatar,id,dateBirth}) => {

  const getCurentAge = (dateBirth:number) =>{
    if(dateBirth){
       const date =  convertSecondstoDate(dateBirth)
        var ageDifMs = Date.now() - date.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  };

const years = dateBirth ? getCurentAge(dateBirth) : null;




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
                            variant="body2" color="text.other"
                        >
                            {name ? name : <SkeletonText/>}
                            <div>
                                {years} р.
                            </div>
                        </Typography>
                    </LinkMU>
                </Link>
            </div>
            <div className={styles.sidebar}>
                <div className={styles.messages}>
                    {id && <AddMessageBtn userId={id}/>}
                </div>

                {id &&  <AddFriendBtn
                    userId={id}
                />}
            </div>

        </Paper>
    );
};

export default PeopleItem;