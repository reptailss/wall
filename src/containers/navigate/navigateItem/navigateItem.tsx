import React, {FC, ReactNode} from 'react';
import {useAuth} from "../../../hooks/useAuth/useAuth";
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import styles from "./styles.module.scss";
import SkeletonText from "../../../components/skeletons/SkeletonText";

interface IUserNavigateItemProps {
    icon: ReactNode,
    path: string,
    text: string;
}

const NavigateItem: FC<IUserNavigateItemProps> = ({icon, path, text}) => {
    const { loadingUser} = useAuth();
    return (
        <div className={styles.root}>
            {!loadingUser ?
            <Link href={path}>
                <LinkMU underline="none"
                        variant="body1"
                        component="div"
                        color="text.primary"
                        className={styles.link}>
                        <div className={styles.icon}>
                            {icon}
                        </div>
                        <div>
                            {text}
                        </div>

                </LinkMU>
            </Link> : <SkeletonText height={40}/>}
        </div>
    );
};

export default NavigateItem;