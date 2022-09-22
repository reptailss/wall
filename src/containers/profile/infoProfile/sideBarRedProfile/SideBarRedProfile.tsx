import React, {FC} from 'react';
import styles from './styles.module.scss'
import {convertSecondstoDate, OptionsDate} from "../../../../helpers/date";
import {ITimestamp} from "../../../../types/timestamp";
import { motion} from "framer-motion";

interface ISideBarInfoProfileProps {
    dateBirth: number | null,
    city: string,
    jop: string,
    maritalStatus: string,
    timestamp? :ITimestamp,
}


const SideBarRedProfile:FC<ISideBarInfoProfileProps> = ({dateBirth,city,jop,maritalStatus,timestamp}) => {

    const date = dateBirth ?  convertSecondstoDate(dateBirth) : 0;
    const uadate = new Intl.DateTimeFormat('uk',OptionsDate).format(date);

    const dateRegister = timestamp?.seconds ?  convertSecondstoDate(timestamp.seconds) : 0;
    const uadateRegister = new Intl.DateTimeFormat('uk',OptionsDate).format(dateRegister);
    return (
        <motion.div
            key={'redprofile'}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                type: 'Tween',
                opacity: {duration: 1.2},
            }}
            className={styles.root}>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.itemInfo}>
                       Дата народження red red
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
        </motion.div>
    );
};

export default SideBarRedProfile;