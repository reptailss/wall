import {useFormik} from 'formik';
import {validationSchemaSendPassword} from '../../../constans/validate/auth'

import SpinnerBlock from "../../../components/spinner/Spinner";
import {useAuth} from "../../../hooks/useAuth/useAuth";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

import styles from './styles.module.scss'
import {Typography} from "@mui/material";
import React from "react";

const SendPassword = () => {
    const {sendPasswordReset, loadingSendPassword} = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchemaSendPassword,
        onSubmit: (values) => {
            sendPasswordReset(values.email)

        },
    });
    const content = !loadingSendPassword ? <form
        className={styles.rootPage}
        onSubmit={formik.handleSubmit}
    >
        <Typography
            className={styles.title}
            variant="body1"
            color={'primary'}
        >
            Введіть email на який ви реєстрували аккаунт
        </Typography>
        <TextField
            className={styles.input}
            fullWidth
            id="email"
            name="email"
            label="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
        />
        <div className={styles.wrapbtn}>
            <Button
                className={styles.button}
                color="primary"
                variant="contained"
                fullWidth type="submit">
                Відправити
            </Button>
        </div>
    </form> : <SpinnerBlock/>;


    return (
        <div className={styles.root}>
            {content}
        </div>
    );
};

export default SendPassword;