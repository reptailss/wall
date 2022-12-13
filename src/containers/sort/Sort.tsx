import React, {FC, memo, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

import {dataSelectDateBirth, dataSelectMaritalStatus, dataSelectSex} from "../../constans/buttons";

import SelectButtons from '../../components/selectButtons/SelectButtons'
import Accor from "../../components/accor/Accor"


import styles from './sort.module.scss'

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    setParamsCity,
    setParamsDateBirth,
    setParamsLogin,
    setParamsMaritalStatus,
    setParamsName,
    setParamsSex,
    setParamsTitleDateBirth,
    setParamsTitleMaritalStatus,
    setParamsTitleSex
} from '../../redux/slice/userSlice'
import useDebounce from "../../hooks/useDebounce/useDebounce";


const Sort: FC = () => {

        const dispatch = useAppDispatch();


        const {searchParams} = useAppSelector(state => state.user);

        const {city, name, login} = searchParams;

        const [cityValue, setCityValue] = useState<string | false>(city.value);
        const [nameValue, setNameValue] = useState<string | false>(name.value);
        const [loginValue, setLoginValue] = useState<string | false>(login.value);


        useEffect(() => {
            setCityValue(city.value)
        }, [city.value]);

        useEffect(() => {
            setNameValue(name.value)
        }, [name.value]);

        useEffect(() => {
            setLoginValue(login.value)
        }, [login.value]);


        const onChangeSex = (value: 'female' | 'male' | 'other' | string | false) => {
            if (!value || value === '') {
                dispatch(setParamsSex(false))
            } else {
                dispatch(setParamsSex(value))

            }

        };

        const onChangeMaritalStatus = (value: 'married' | 'notMarried' | 'ActivelyLooking' | string | false) => {
            if (!value || value === '' || value === 'false') {
                dispatch(setParamsMaritalStatus(false))
            } else {
                dispatch(setParamsMaritalStatus(value));
                dispatch(setParamsTitleMaritalStatus(value))
            }

        };

        const onChangeMaritalStatusTitle = (value: string) => {
            dispatch(setParamsTitleMaritalStatus(value))

        };

        const onChangeSexTitle = (value: string) => {
            dispatch(setParamsTitleSex(value))

        };


        const onChangeDateBirthTitle = (value: string) => {
            dispatch(setParamsTitleDateBirth(value))

        };


        const debouncedValueName = useDebounce<string | false>(nameValue, 800);

        const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameValue(event.target.value);

        };

        useEffect(() => {
            dispatch(setParamsName(debouncedValueName))
        }, [debouncedValueName]);


        const onChangeDateBirth = (value: { of: number, to: number } | false) => {
            dispatch(setParamsDateBirth({to: value, of: value}))

        };

        const debouncedValueCity = useDebounce<string | false>(cityValue, 800);

        const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCityValue(event.target.value);
        };

        useEffect(() => {
            dispatch(setParamsCity(debouncedValueCity))
        }, [debouncedValueCity]);


        const debouncedValueLogin = useDebounce<string | false>(loginValue, 800);

        const onChangesLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
            setLoginValue(event.target.value);
        };

        useEffect(() => {

            dispatch(setParamsLogin(debouncedValueLogin))


        }, [debouncedValueLogin]);


        return (
            <div className={styles.inner}>

                <div className={styles.item}>
                    <Accor title={'Фільтри'}>

                        {/*<div className={styles.item}>*/}
                            {/*<div className={styles.title}>*/}
                                {/*логін*/}
                            {/*</div>*/}
                            {/*<TextField*/}
                                {/*size="small"*/}
                                {/*key={'login'}*/}
                                {/*className={styles.inputText}*/}
                                {/*fullWidth*/}
                                {/*id={'login'}*/}
                                {/*name={'login'}*/}
                                {/*label={'login'}*/}
                                {/*value={loginValue}*/}
                                {/*onChange={onChangesLogin}*/}
                                {/*multiline*/}
                            {/*/>*/}
                        {/*</div>*/}


                        {/*<div className={styles.item}>*/}
                            {/*<div className={styles.title}>*/}
                                {/*імя*/}
                            {/*</div>*/}
                            {/*<TextField*/}
                                {/*size="small"*/}
                                {/*key={'name'}*/}
                                {/*className={styles.inputText}*/}
                                {/*fullWidth*/}
                                {/*id={'name'}*/}
                                {/*name={'name'}*/}
                                {/*label={'імя'}*/}
                                {/*value={nameValue}*/}
                                {/*onChange={onChangeName}*/}
                                {/*multiline*/}
                            {/*/>*/}
                        {/*</div>*/}

                        <div className={styles.item}>
                            <div className={styles.title}>
                                Сімейний статус
                            </div>
                            <div className={styles.select}>
                                <SelectButtons
                                    onChangeValue={(value) => {
                                        onChangeMaritalStatus(value)
                                    }}
                                    onChangeTitle={(value) => {
                                        onChangeMaritalStatusTitle(value)
                                    }}
                                    defaultlValue={searchParams.maritalStatus.value}
                                    defaultTitle={searchParams.maritalStatus.title}
                                    data={dataSelectMaritalStatus}
                                />
                            </div>
                        </div>


                        <div className={styles.item}>
                            <div className={styles.title}>
                                Стать
                            </div>
                            <div className={styles.select}>
                                <SelectButtons
                                    onChangeValue={(value) => {
                                        onChangeSex(value)
                                    }}
                                    onChangeTitle={(value) => {
                                        onChangeSexTitle(value)
                                    }}
                                    defaultlValue={searchParams.sex.value}
                                    defaultTitle={searchParams.sex.title}
                                    data={dataSelectSex}
                                />
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.title}>
                                місто
                            </div>
                            <TextField
                                size="small"
                                key={'city'}
                                className={styles.inputText}
                                fullWidth
                                id={'city'}
                                name={'city'}
                                label={'місто'}
                                value={cityValue}
                                onChange={onChangeCity}
                                multiline
                            />
                        </div>

                        {/*<div className={styles.item}>*/}
                            {/*<div className={styles.title}>*/}
                                {/*Вік*/}
                            {/*</div>*/}
                            {/*<div className={styles.select}>*/}
                                {/*<SelectButtons*/}
                                    {/*onChangeValue={(value) => {*/}
                                        {/*onChangeDateBirth(value)*/}
                                    {/*}}*/}
                                    {/*onChangeTitle={(value) => {*/}
                                        {/*onChangeDateBirthTitle(value)*/}
                                    {/*}}*/}
                                    {/*defaultlValue={searchParams.dateBirth.of}*/}
                                    {/*defaultTitle={searchParams.dateBirth.title}*/}
                                    {/*data={dataSelectDateBirth}*/}
                                {/*/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </Accor>
                </div>
            </div>
        );
    };

export default Sort;