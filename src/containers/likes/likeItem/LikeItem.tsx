import React, {FC} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'
import styles from "./styles.module.scss";
import useMedia from "../../../hooks/useMedia/useMedia";


interface ILikeItemProps {
    authorNameLike:string,
    id: string
}

const LikeItem:FC<ILikeItemProps> = ({authorNameLike,id}) => {

    const{isDesktop,isTablet} = useMedia();

    const variant = isDesktop || isTablet ? 'body2' : 'caption';
    return (
        <div>
            <Link href={`/users/${id}`}>
                <LinkMU underline="none"
                        variant={variant}
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