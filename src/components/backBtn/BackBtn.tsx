import React, {FC} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import styles from './styles.module.scss'

interface IBackBtnProps {
    text:string,
    path: string,

}

const BackBtn:FC<IBackBtnProps> = ({text,path}) => {
    return (
        <Link href={path}>
            <LinkMU underline="none"
                    variant="caption"
                    component="div"
                    color="secondary"
                    className={styles.back}>
                <KeyboardBackspaceIcon/>
                <div className={styles.text}>
                    {text}
                </div>
            </LinkMU>
        </Link>
    );
};

export default BackBtn;