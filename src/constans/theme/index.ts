import {PaletteMode} from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            ...(mode === 'light'
                ? {
                    main: '#68709A',
                }
                : {
                    main: '#28946b',
                }),
        },
        secondary: {
            ...(mode === 'light'
                ? {
                    main: '#000000',
                }
                : {
                    main: '#28946b',
                }),
        },
        background: {
            ...(mode === 'light'
                ? {
                    default: '#FFFFFF',
                    paper: '#74748A',
                }
                : {
                    default: '#303030',
                    paper: '#242526;2',
                }),
        },
        text: {
            ...(mode === 'light'
                ? {
                    primary:'#00000',
                    secondary:' rgba(255,255,255, .6)',
                    other: 'rgba(255,255,255, .8)'
                }
                : {
                    primary: '#E4E6EB;',
                    secondary: 'rgba(0,0,0, .6)',
                    other: 'rgba(255,255,255, .4)'
                }),
        },

    },
});
