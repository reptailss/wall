import React, {FC, useState} from 'react';

import styles from './styles.module.scss'
import TextField from '@mui/material/TextField';

import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

const SearchInput = () => {

    const [value, setValue] = useState('');



    const dispatch = useAppDispatch();

    const onchangeValue = (value: string) => {


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
                    onChange={(event) => onchangeValue(event.target.value)}
                />
            </div>


    );
};

export default SearchInput;