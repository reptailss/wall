import React, {FC} from 'react';
import styles from './styles.module.scss'
import {convertSecondstoDate, getCurrentAge, OptionsDate} from "../../../../helpers/date";
import {ITimestamp} from "../../../../types/timestamp";
import {motion} from "framer-motion";
import {Typography} from "@mui/material";
import SkeletonText from "../../../../components/skeletons/SkeletonText";
import {Col, Row} from "react-bootstrap";

interface ISideBarInfoProfileProps {
    dateBirth: number | null,
    city: string,
    jop: string,
    maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string,
    timestamp?: ITimestamp,
    loadingProfile: boolean,
    sex:'female' | 'male' | 'other' | string,
}


const SideBarInfoProfile: FC<ISideBarInfoProfileProps> = ({dateBirth, city, jop, maritalStatus, timestamp, loadingProfile,sex}) => {

    console.log(timestamp,'time')


    const date = convertSecondstoDate(dateBirth);
    const uadate = new Intl.DateTimeFormat('uk', OptionsDate).format(date);

    const dateRegister =  convertSecondstoDate(timestamp?.seconds);
    const uadateRegister = new Intl.DateTimeFormat('uk', OptionsDate).format(dateRegister);

    const sexText = sex === "female" ? 'жіноча' : sex === "male" ? 'чоловіча' : sex === "other" ? 'інша' : '';
    const maritalStatusText = maritalStatus === "married" ? 'одружений(-а)' : maritalStatus === "notMarried" ? 'не одружений(-а)' : maritalStatus === "ActivelyLooking" ? 'в активному пошуку' : '';

    const years = dateBirth ? getCurrentAge(dateBirth) : null;

    return (
        <motion.div
            key={'infoprofile'}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                type: 'Tween',
                opacity: {duration: 1.2},
            }}
            className={styles.root}>
            <Row >

                <Col xs={6} className={styles.item}>
                    <Typography
                        className={styles.itemInfo}
                        variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Стать'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !sexText  ? <SkeletonText/> : sexText}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography
                        className={styles.itemInfo}
                                variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Дата народження'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !dateBirth  ? <SkeletonText/> : uadate}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography
                        className={styles.itemInfo}
                        variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Вік'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !years  ? <SkeletonText/> : years}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography className={styles.itemInfo}
                                variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Місце народження'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !city ? <SkeletonText/> : city}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography className={styles.itemInfo}
                                variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Робота'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !jop ? <SkeletonText/> : jop}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography className={styles.itemInfo}
                                variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Сімейний статус'}
                    </Typography>
                </Col>

                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1">
                        {loadingProfile || !maritalStatusText ? <SkeletonText/> : maritalStatusText}
                    </Typography>
                </Col>


                <Col xs={6} className={styles.item}>
                    <Typography className={styles.itemInfo}
                                variant="body1"
                    >
                        {loadingProfile ? <SkeletonText/> : 'Дата реєстрації'}
                    </Typography>
                </Col>
                <Col xs={6} className={styles.item}>
                    <Typography
                        variant="body1"
                        className={styles.itemContent}>
                        {loadingProfile || !timestamp ? <SkeletonText/>: uadateRegister }
                    </Typography>
                </Col>

            </Row>
        </motion.div>
    );
};

export default SideBarInfoProfile;