import React, {FC, useState} from 'react';

import styles from './styles.module.scss'
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";


import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import {setWhereSearchValue} from '../../../redux/slice/userSlice'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

const SearchInput = () => {

    const [value, setValue] = useState('');

    const{searchValue} = useAppSelector(state => state.user)

    const dispatch = useAppDispatch();

    const onchangeValue = (value: string) => {
        dispatch(setWhereSearchValue({value}))

    };


    return (


            <div className={styles.innerinput}>
                <TextField

                    size="small"
                    key={'search'}
                    className={styles.input}
                    fullWidth
                    id={'search'}
                    name={'search'}
                    label={'пошук..'}
                    value={searchValue}
                    onChange={(event) => onchangeValue(event.target.value)}
                />
            </div>


    );
};

export default SearchInput;