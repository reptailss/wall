import {memo} from 'react';


import styles from './styles.module.scss'

import {setParamsSex,
    setParamsLogin,
    setParamsCity,
    setParamsMaritalStatus,
    setParamsName,
    setParamsDateBirth,
    setParamsTitleSex,
    setParamsTitleMaritalStatus,
    setParamsTitleDateBirth

} from '../../../redux/slice/userSlice'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";


const SearchType = () => {

        const {searchParams} = useAppSelector(state => state.user);
        const {city, maritalStatus, name, login, dateBirth, sex} = searchParams;

        const dispatch = useAppDispatch();


        const searchTypeButton = [

            // {value: 'name',
            //     title: 'імя',
            //     onClickButton: () => {
            //         dispatch(setParamsName(''))
            //     },
            //     data:name.value
            // },
            // {value: 'login',
            //     title: 'логін',
            //     onClickButton: () => {
            //         dispatch(setParamsLogin(''))
            //     },
            //     data:login.value
            // },
            {
                value: 'city',
                title: 'місто',
                onClickButton: () => {
                    dispatch(setParamsCity(''))
                },
                data:city.value,
            },
            // {value: 'dateBirth',
            //     title: 'вік',
            //     onClickButton: () => {
            //         dispatch(setParamsDateBirth({
            //             of:'',
            //             to:'',
            //         }));
            //         dispatch(setParamsTitleDateBirth('неважливо'))
            //     },
            //     data:dateBirth.title
            // },
            {value: 'maritalStatus'
                , title: 'сімейний статус',
                onClickButton: () => {
                    dispatch(setParamsMaritalStatus(false));
                    dispatch(setParamsTitleMaritalStatus('неважливо'))
                },
                data:maritalStatus.title
            },

            {value: 'sex',
                title: 'стать',
                onClickButton: () => {
                    dispatch(setParamsSex(false));
                    dispatch(setParamsTitleSex('неважливо'))
                },
                data:sex.title
            },
        ];

        const searchTypeList = searchTypeButton?.map((item) => {

            const {value, title,data} = item;
            const clazz =  (data === '') || (data === 'неважливо') || !data ? styles.item : styles.item + ' ' + styles.active;

            return (
                <div onClick={() => item.onClickButton()}
                     className={clazz}
                     key={value}>{title}
                </div>
            )
        });

        return (
            <div className={styles.list}>
                {searchTypeList}
            </div>
        );
    };

export default SearchType;