import React, {FC} from 'react';
import Button from '@mui/material/Button';
import styles from "./styles.module.scss";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

    ;


interface IChangeAvatarBtnProps {
    text?: string
}

const ChangeAvatarBtn:FC<IChangeAvatarBtnProps> = ({text}) => {
    return (


        <Link href={'/redAvatar'}>
            <LinkMU underline="none"
                    component="div"
                    color="secondary">
                <Button
                    component={'div'}
                    className={styles.redAvatarBtn}
                    variant="outlined" color="secondary">
                    {text}
                </Button>
            </LinkMU>
        </Link>
    );
};

export default ChangeAvatarBtn;