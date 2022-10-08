import React, {FC} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import styles from "./styles.module.scss";


interface ILikeItemProps {
    authorNameLike:string,
    id: string
}

const LikeItem:FC<ILikeItemProps> = ({authorNameLike,id}) => {
    return (
        <div>
            <Link href={`/users/${id}`}>
                <LinkMU underline="none"
                        variant="caption"
                        component="div"
                        color="text.primary"
                        className={styles.item}>
                   {id}

                </LinkMU>
            </Link>
        </div>
    );
};

export default LikeItem;