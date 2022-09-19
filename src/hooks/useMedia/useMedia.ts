import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMedia() {


    const isMobile = useMediaQuery('(max-width:320)');
    const tablet = useMediaQuery('(max-width:768px)');
    const isDesktop = useMediaQuery('(min-width:1200px)');

    const isTablet = !(isDesktop || tablet) ? true : false;



    return{
        isMobile,
        isTablet,
        isDesktop
    }
}