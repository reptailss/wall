import React from 'react';
import Navigate from "../navigate/Navigate";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from  './styles.module.scss'

const drawerWidth = 240;

const MobileNavigate = () => {

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Toolbar/>
            <IconButton
                className={styles.icon}
                onClick={handleDrawerToggle}>
              <ChevronLeftIcon
              fontSize={'large'}
              />
            </IconButton>
            <Divider/>
            <Navigate
                onClickNavigateItem={handleDrawerToggle}
                transparent/>
            <Divider/>
        </>
    );


    return (
        <>

            <MenuIcon onClick={handleDrawerToggle}/>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{

                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                {drawer}
            </Drawer>

        </>
    );
};

export default MobileNavigate;