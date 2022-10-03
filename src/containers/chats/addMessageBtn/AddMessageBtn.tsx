import React, {FC} from 'react';
import styles from "./styles.module.scss";
import MailIcon from '@mui/icons-material/Mail';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {useRouter} from "next/router";

interface IAddMessageBtnProps {
    userId: string
}


const AddMessageBtn: FC<IAddMessageBtnProps> = ({userId}) => {
    const router = useRouter();

    const {id} = useAppSelector(state => state.user);

    const {CheckChat, loadingCheckChat,createChat} = useChats();

    const onClickBtn = async () => {
        const combinedId = await CheckChat({
            userId,
            currentUserId: id
        });
       if(combinedId){
           router.push(`/userChat/${combinedId}`);
       }else{
          const combinedId =  await createChat({
               userId,
               currentUserId: id
           });

           router.push(`/userChat/${combinedId}`);
       }
    };

    return (
        <Button
            // disabled={loadingCheckChat}
            onClick={onClickBtn}
            className={styles.root}>
            <Typography
                className={styles.text}
                color={'text.primary'}
                variant={'caption'}
            >написати
            </Typography>
            <MailIcon fontSize="small" color="action"/>
        </Button>
    );
};

export default AddMessageBtn;