import {memo} from 'react';



import styles from './styles.module.scss'

import setWhereSearchType from '../../../redux/slice/userSlice'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {searchTypeButton} from "../../../constans/buttons";


const SearchType = memo(() => {

        const {searchType} = useAppSelector(state => state.user);
        const dispatch = useAppDispatch();


        const searchTypeList = searchTypeButton?.map((item) => {

            const {value, title} = item;
            const clazz = searchType === value ? styles.item + ' ' + styles.active : styles.item;

            return (
                <div onClick={() => dispatch(setWhereSearchType(value))}
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
    }
);

export default SearchType;