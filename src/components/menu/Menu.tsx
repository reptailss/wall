import React, {FC, useState,ReactNode} from 'react';
import styles from './styles.module.scss'


import Button from '@mui/material/Button';
import MenuMui from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IMenuProps {
    children?: ReactNode,
    button?: ReactNode,
    name: string,
    onCloseMenu?: () => void,
}

const Menu: FC<IMenuProps> = ({children,button,name,onCloseMenu}) => {


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const btn = button ? button :  <MoreHorizIcon
        color={'info'}
        fontSize={'small'}

    />;

    return (
        <>
            <Button
                id={name}
                aria-controls={open ? 'basic-menuUser' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.btn}
            >

                {btn}
            </Button>
            <MenuMui
                className={styles.menu}
                transitionDuration={700}
                id={`${name}-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `${name}`,
                }}
            >
                {children}
            </MenuMui>
        </>
    );
};

export default Menu;