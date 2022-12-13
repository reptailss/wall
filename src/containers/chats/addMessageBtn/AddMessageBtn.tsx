import React, {FC} from 'react';
import styles from "./styles.module.scss";
import MailIcon from '@mui/icons-material/Mail';
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useChats} from "../../../hooks/useChats/useChats";
import {useAppSelector} from "../../../hooks/redux";
import {useRouter} from "next/router";
import useMedia from "../../../hooks/useMedia/useMedia";

interface IAddMessageBtnProps {
    userId: string
}


const AddMessageBtn: FC<IAddMessageBtnProps> = ({userId}) => {
    const router = useRouter();

    const {id,isAuth} = useAppSelector(state => state.user);

    const {CheckChat, loadingCheckChat,createChat} = useChats();

    const{isDesktop} = useMedia();

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
     <>
         {!(userId === id) && isAuth ?    <Button
             onClick={onClickBtn}
             className={styles.root}>
             <Typography
                 className={styles.text}
                 color={'text.primary'}
                 variant={'caption'}
             >{isDesktop ? 'написати' : null}
             </Typography>
             <MailIcon fontSize="small" color="action"/>
         </Button> : null}

         </>
    );
};

export default AddMessageBtn;