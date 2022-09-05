import React, {FC} from 'react';
import styles from './styles.module.scss'
import {convertSecondstoDate, OptionsDate} from "../../../../helpers/date";

interface ISideBarInfoProfileProps {
    dateBirth: number,
    city: string,
    jop: string,
    maritalStatus: string,
}


const SideBarInfoProfile:FC<ISideBarInfoProfileProps> = ({dateBirth,city,jop,maritalStatus}) => {
    const date = dateBirth ?  convertSecondstoDate(dateBirth) : 0;
    const UAdate = new Intl.DateTimeFormat('uk',OptionsDate).format(date);
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                       Дата народження
                    </div>
                    <div className={styles.itemContent}>
                        {dateBirth ? UAdate : null}
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                        Місце народження
                    </div>
                    <div className={styles.itemContent}>
                        {city}
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                        Робота
                    </div>
                    <div className={styles.itemContent}>
                        {jop}
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                        Сімейний статус
                    </div>
                    <div className={styles.itemContent}>
                        {maritalStatus}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SideBarInfoProfile;