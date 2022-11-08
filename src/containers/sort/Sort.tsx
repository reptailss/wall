import React, {FC, memo, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

import {dataSelectDateBirth, dataSelectMaritalStatus, dataSelectSex} from "../../constans/buttons";

import SelectButtons from '../../components/selectButtons/SelectButtons'
import Accor from "../../components/accor/Accor"


import styles from './sort.module.scss'

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import DateInput from "../../components/dateInput/DateInput";
import {    setParamsSex,
    setParamsLogin,
    setParamsCity,
    setParamsMaritalStatus,
    setParamsName,
    setParamsDateBirth} from '../../redux/slice/userSlice'
import useDebounce from "../../hooks/useDebounce/useDebounce";



const Sort: FC = memo(() => {

        const dispatch = useAppDispatch();


    const {searchParams} = useAppSelector(state => state.user);

    const[cityValue,setCityValue] = useState<string | false>(searchParams.city.value);
    const[nameValue,setNameValue] = useState<string | false>(searchParams.name.value);


    const onChangeSex = (value:'female' | 'male' | 'other' | string | false) =>{
        if(!value || value === ''){
            dispatch(setParamsSex(false))
        } else{
            dispatch(setParamsSex(value))
        }

    };

    const onChangeMaritalStatus = (value:'married' | 'notMarried' | 'ActivelyLooking' |  string |  false) =>{
        if(!value || value === '' || value === 'false'){
            dispatch(setParamsMaritalStatus(false))
        } else{
            dispatch(setParamsMaritalStatus(value))
        }

    };


    const onChangeLogin = (value:string |  false) =>{
        if(!value || value === ''){
            dispatch(setParamsLogin(false))
        } else{
            dispatch(setParamsLogin(value))
        }
    };




    const debouncedValueName = useDebounce<string | false>(nameValue, 800);

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);

    };

    useEffect(()=>{
        if(!debouncedValueName || debouncedValueName === ''){
            dispatch(setParamsName(false))
        } else{
            dispatch(setParamsName(debouncedValueName))
        }
    },[debouncedValueName]);





    const onChangeDateBirth= (value:{of: number,to:number} | false) =>{
        dispatch(setParamsDateBirth(value))

    };

    const debouncedValueCity = useDebounce<string | false>(cityValue, 800);

    const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityValue(event.target.value);
    };

    useEffect(()=>{

        if(!debouncedValueCity || debouncedValueCity === ''){
            dispatch(setParamsCity(false))
        } else{
            dispatch(setParamsCity(debouncedValueCity))
        }
    },[debouncedValueCity]);



        return (
            <div className={styles.inner}>

                <div className={styles.item}>
                    <Accor title={'Фільтри'}>


                        <div className={styles.item}>
                            <div className={styles.title}>
                                імя
                            </div>
                            <TextField
                                size="small"
                                key={'name'}
                                className={styles.inputText}
                                fullWidth
                                id={'name'}
                                name={'name'}
                                label={'імя'}
                                value={nameValue}
                                onChange={onChangeName}
                                multiline
                            />
                        </div>

                        <div className={styles.item}>
                            <div className={styles.title}>
                                Сімейний статус
                            </div>
                            <div className={styles.select}>
                                <SelectButtons
                                    onChangeValue={(value) =>{onChangeMaritalStatus(value)}}
                                               defaultlValue={searchParams.maritalStatus.value}
                                               defaultTitle={'неважливо'}
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
                                    onChangeValue={(value)=>{onChangeSex(value)}}
                                    defaultlValue={searchParams.sex.value}
                                    defaultTitle={'неважливо'}
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

                        <div className={styles.item}>
                            <div className={styles.title}>
                               Вік
                            </div>
                            <div className={styles.select}>
                                <SelectButtons
                                    onChangeValue={(value) =>{onChangeDateBirth(value)}}
                                    defaultlValue={searchParams.dateBirth.of}
                                    defaultTitle={'неважливо'}
                                    data={dataSelectDateBirth}
                                />
                            </div>
                        </div>
                    </Accor>
                </div>
            </div>
        );
    }
);

export default Sort;