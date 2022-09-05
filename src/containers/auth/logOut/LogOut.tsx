import React from 'react';
import {Typography} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './styles.module.scss'
import {useAuth} from "../../../hooks/useAuth/useAuth";
import Button from "@mui/material/Button";


const LogOut = () => {

const {logOutUser,loadingOut} = useAuth();

console.log(loadingOut)
    return (
           <Button disabled={loadingOut}>
               <Typography
                   onClick={logOutUser}
                   className={styles.root}
                   variant="body2"
                   component="div">
                   <LogoutIcon fontSize={'small'}/>
                   <span>Вийти</span>
               </Typography>
           </Button>
    );
};

export default LogOut;