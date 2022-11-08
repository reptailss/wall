import React, {FC, useEffect} from 'react';

import styles from "../sort.module.scss";

import SelectButtons from '../../../components/selectButtons/SelectButtons'
import Accor from "../../../components/accor/Accor"
import {useAppDispatch} from "../../../hooks/redux";


interface IButtonItem {
    value: string,
    title: string
}


interface ISortBlockProps {
    dataSelect: IButtonItem[],
    defaultlValue: string,
    defaultTitle: string
}

const Sortblock: FC<ISortBlockProps> = ({dataSelect, defaultlValue, defaultTitle}) => {

    const dispatch = useAppDispatch();

    const onChangeSort = (value: string) => {
        // dispatch(setSort((value)))
    };

    useEffect(() => {
        // dispatch(setSort(defaultlValue))
    }, []);

    return (
        <div className={styles.item}>
            <Accor title={'Sort'}>
                <div className={styles.title}>
                    Sort results by
                </div>
                <div className={styles.select}>
                    <SelectButtons onChangeValue={onChangeSort}
                                   defaultlValue={defaultlValue}
                                   defaultTitle={defaultTitle}
                                   data={dataSelect}
                    />
                </div>
            </Accor>
        </div>
    );
};

export default Sortblock;