import React, {FC, useState} from 'react';
import styles from './styles.module.scss'
import {ITimestamp} from "../../../../types/timestamp";
import {motion} from "framer-motion";
import {useFormik} from "formik";
import {useUsers} from "../../../../hooks/useUser/UseUser";
import {useAppSelector} from "../../../../hooks/redux";
import {Col, Row} from "react-bootstrap";
import {Button, TextField, Typography} from "@mui/material";

import DateInput from "../../../../components/dateInput/DateInput";
import {validationSchemaUpdateProfile} from "../../../../constans/validate/profile";
import SelectButtons from "../../../../components/selectButtons/SelectButtons";
import {dataSelectMaritalStatus, dataSelectSex} from "../../../../constans/buttons";



interface ISideBarInfoProfileProps {
    dateBirth: number | null,
    city: string,
    jop: string,
    maritalStatus: string,
    timestamp?: ITimestamp,
    name: string,
    onUpdateProfile: () => void
}


const SideBarRedProfile: FC<ISideBarInfoProfileProps> = ({dateBirth, city, jop, maritalStatus, name, onUpdateProfile}) => {

    const {id} = useAppSelector(state => state.user);


    const [dateB, setDate] = useState<number>(234234234);

    const {updateUserProfile, loadingUpdateUserProfile, getUserProfile} = useUsers();

    const[maritalStatusUser,setMaritalStatusUser] = useState<'married' | 'notMarried' | 'ActivelyLooking' | string>(maritalStatus);


    const onChangeMaritalStatus = (maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string) => {
        setMaritalStatusUser(maritalStatus)
    };

    const maritalStatusText = maritalStatus === "married" ? 'одружений(-а)' : maritalStatus === "notMarried" ? 'не одружений(-а)' : maritalStatus === "ActivelyLooking" ? 'в активному пошуку' : '';


    const formik = useFormik({
        initialValues: {
            city: city,
            jop: jop,
            maritalStatus: maritalStatus,
            name: name
        },
        validationSchema: validationSchemaUpdateProfile,
        onSubmit: async (values) => {
            const {city, jop, maritalStatus, name} = values;
            await updateUserProfile({
                id: id,
                body: {
                    dateBirth: dateB,
                    city,
                    jop,
                    maritalStatus:maritalStatusUser,
                    name: name,
                },
                snack:true
            });

            await getUserProfile(id);
            onUpdateProfile();

        },
    });

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

            <form
                onSubmit={formik.handleSubmit}
            >
                <Row>


                    <Col xs={6} className={styles.item}>
                        <Typography className={styles.itemInfo}
                                    variant="body1"
                        >
                           імя
                        </Typography>
                    </Col>
                    <Col xs={6} className={styles.item}>
                        <Typography
                            variant="body1">
                            <TextField
                                className={styles.input}
                                fullWidth
                                id="name"
                                name="name"
                                label="імя"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Typography>
                    </Col>


                    <Col xs={6} className={styles.item}>
                        <Typography className={styles.itemInfo}
                                    variant="body1">
                            Дата народження
                        </Typography>
                    </Col>
                    <Col xs={6} className={styles.item}>
                        <Typography
                            variant="body1">
                            {dateBirth && <DateInput
                                dateProp={'1999-02-01'}
                                onChangeDateValue={setDate}/>}
                        </Typography>
                    </Col>


                    <Col xs={6} className={styles.item}>
                        <Typography className={styles.itemInfo}
                                    variant="body1"
                        >
                            Місце народження
                        </Typography>
                    </Col>
                    <Col xs={6} className={styles.item}>
                        <Typography
                            variant="body1">
                            <TextField
                                className={styles.input}
                                fullWidth
                                id="city"
                                name="city"
                                label="місто або селище"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Typography>
                    </Col>


                    <Col xs={6} className={styles.item}>
                        <Typography className={styles.itemInfo}
                                    variant="body1"
                        >
                            Робота
                        </Typography>
                    </Col>
                    <Col xs={6} className={styles.item}>
                        <Typography
                            variant="body1">
                            <TextField
                                className={styles.input}
                                fullWidth
                                id="jop"
                                name="jop"
                                label="робота"
                                value={formik.values.jop}
                                onChange={formik.handleChange}
                                error={formik.touched.jop && Boolean(formik.errors.jop)}
                                helperText={formik.touched.jop && formik.errors.jop}
                            />
                        </Typography>
                    </Col>


                    <Col xs={6} className={styles.item}>
                        <Typography className={styles.itemInfo}
                                    variant="body1"
                        >
                            Сімейний статус
                        </Typography>
                    </Col>

                    <Col xs={6} className={styles.item}>
                        {/*<Typography*/}
                            {/*variant="body1">*/}
                            {/*<TextField*/}
                                {/*className={styles.input}*/}
                                {/*fullWidth*/}
                                {/*id="maritalStatus"*/}
                                {/*name="maritalStatus"*/}
                                {/*label="статус"*/}
                                {/*value={formik.values.maritalStatus}*/}
                                {/*onChange={formik.handleChange}*/}
                                {/*error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}*/}
                                {/*helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}*/}
                            {/*/>*/}
                        {/*</Typography>*/}


                        <div className={styles.select}>
                            <SelectButtons
                                onChangeValue={onChangeMaritalStatus}
                                defaultlValue={maritalStatusUser}
                                defaultTitle={maritalStatusText}
                                data={dataSelectMaritalStatus}
                            />
                        </div>
                    </Col>



                    <Col xs={12} className={styles.item}>
                        <Button
                            disabled={loadingUpdateUserProfile}
                            className={styles.button}
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit">
                            зберегти
                        </Button>
                    </Col>


                </Row>
            </form>

        </motion.div>
    );
};

export default SideBarRedProfile;