import React, {FC} from 'react';
import styles from './styles.module.scss'
import {convertSecondstoDate, OptionsDate} from "../../../../helpers/date";
import {ITimestamp} from "../../../../types/timestamp";

interface ISideBarInfoProfileProps {
    dateBirth: number,
    city: string,
    jop: string,
    maritalStatus: string,
    timestamp? :ITimestamp,
}


const SideBarInfoProfile:FC<ISideBarInfoProfileProps> = ({dateBirth,city,jop,maritalStatus,timestamp}) => {

    const date = dateBirth ?  convertSecondstoDate(dateBirth) : 0;
    const uadate = new Intl.DateTimeFormat('uk',OptionsDate).format(date);

    const dateRegister = timestamp?.seconds ?  convertSecondstoDate(timestamp.seconds) : 0;
    const uadateRegister = new Intl.DateTimeFormat('uk',OptionsDate).format(dateRegister);
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                       Дата народження
                    </div>
                    <div className={styles.itemContent}>
                        {dateBirth ? uadate : null}
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

                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                        Дата реєстрації
                    </div>
                    <div className={styles.itemContent}>
                        {timestamp ? uadateRegister : null}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SideBarInfoProfile;