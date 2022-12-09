import styles from './styles.module.scss'
import {useFormik} from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {validationSchemaRegister} from '../../../constans/validate/auth'
import SpinnerBlock from "../../../components/spinner/Spinner";
import {useAuth} from "../../../hooks/useAuth/useAuth";
import {useUsers} from "../../../hooks/useUser/UseUser";
import DateInput from "../../../components/dateInput/DateInput";
import {useEffect, useState} from "react";
import useDebounce from "../../../hooks/useDebounce/useDebounce";
import {useFriends} from "../../../hooks/useFriends/useFriends";
import {useRouter} from "next/router";
import SelectButtons from "../../../components/selectButtons/SelectButtons";
import {dataSelectMaritalStatus, dataSelectSex} from "../../../constans/buttons";
import React from "react";
import {Typography} from "@mui/material";


const Register = () => {
    const {
        registerUser,
        loadingRegister,
        checkFreeLogin,
        updateLoginUser
    } = useAuth();
    const {setUserProfile,getUserProfile} = useUsers();
    const [dateBirth, setDateBirth] = useState<number>(810413076);
    const [freeLogin,setFreeLogin] = useState<boolean>(true);
    const {setTotalFriends} = useFriends();
    const router = useRouter();

    const[sex,setSex] = useState<'female' | 'male' | 'other' | string>('female');
    const[maritalStatus,setMaritalStatus] = useState<'married' | 'notMarried' | 'ActivelyLooking' | string>('ActivelyLooking');


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            dateBirth: '',
            city: '',
            jop: '',
            maritalStatus: maritalStatus,
            login: ''

        },
        validationSchema: validationSchemaRegister,
        onSubmit: async (values) => {
            const {name, surname, city, jop, maritalStatus,email,password,login} = values;
            const res = await registerUser(email,password);
            await setUserProfile({
                    id: login,
                    body: {
                        name:`${name} ${surname}`,
                        dateBirth,
                        city,
                        jop,
                        maritalStatus,
                        currentAvatar: 'https://firebasestorage.googleapis.com/v0/b/blog-f279e.appspot.com/o/avatar.png?alt=media&token=4c4cdba7-a967-4b55-8225-7c5ae4592711',
                        uid:res.user.uid,
                        status:'...',
                        sex:sex,
                        filter: true,
                    }
                }
            );
            await updateLoginUser({
                user:res.user,
                login
            });
            await setTotalFriends({
                userId:login,
                body:{
                    totalConfirm: 0,
                    totalOtherRequest: 0,
                    totalMyRequest: 0,
                }
            });
            await getUserProfile(login);
            router.push('/')

        },
    });


    const debouncedValueLogin = useDebounce<string>(formik.values.login, 800);



    const onCheckFreeLogin = async (idLogin: string) =>{
        const res = await checkFreeLogin(idLogin);
        if(!(res === undefined || null)){
            setFreeLogin(false);
        } else{
            setFreeLogin(true);
        }
    };


    useEffect(()=>{
        if(debouncedValueLogin.length > 2){
            onCheckFreeLogin(debouncedValueLogin);

        }
    },[debouncedValueLogin]);

    const onChangeSex = (sex: 'female' | 'male' | 'other' | string) => {
        setSex(sex)
    };

    const onChangeMaritalStatus = (maritalStatus: 'married' | 'notMarried' | 'ActivelyLooking' | string) => {
        setMaritalStatus(maritalStatus)
    };




    const content = !loadingRegister ? <form
        className={styles.root}
        onSubmit={formik.handleSubmit}
    >
        <TextField
            className={styles.input}
            fullWidth
            id="email"
            name="email"
            label="ваш Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
            className={styles.input}
            fullWidth
            id={'password'}
            name={'password'}
            label={'пароль'}
            type={'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
        />

        <div className={styles.wrapLoginInput}>
            <TextField
                className={styles.input}
                fullWidth
                id={'login'}
                name={'login'}
                label={'логін'}
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.login) || !freeLogin}
                helperText={formik.touched.password && formik.errors.login}
            />
            <div
                style={
                    { color: freeLogin && debouncedValueLogin.length ? 'green' : 'red'}
                }
                className={styles.freeLogin}>
                {debouncedValueLogin.length && debouncedValueLogin.length > 2 ? freeLogin ? 'вільний' : 'зайнятий' : 'мінімум 2 символа'}

            </div>
        </div>

        <div className={styles.item}>
            <Typography
                color={'text.primary'}
                variant={'body1'}
                className={styles.title}>
                Стать
            </Typography>
            <div className={styles.select}>
                <SelectButtons
                    onChangeValue={onChangeSex}
                    defaultlValue={'female'}
                    defaultTitle={'Жіноча'}
                    data={dataSelectSex}
                />
            </div>
        </div>

        <div className={styles.item}>
            <Typography
                color={'text.primary'}
                variant={'body1'}
                className={styles.title}>
                сімейний статус
            </Typography>
            <div className={styles.select}>
                <SelectButtons
                    onChangeValue={onChangeMaritalStatus}
                    defaultlValue={'ActivelyLooking'}
                    defaultTitle={'В активному пошуку'}
                    data={dataSelectMaritalStatus}
                />
            </div>
        </div>

        <TextField
            className={styles.input}
            fullWidth
            id={'name'}
            name={'name'}
            label={"ваше імя"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
            className={styles.input}
            fullWidth
            id={'surname'}
            name={'surname'}
            label={"ваше Прізвище"}
            value={formik.values.surname}
            onChange={formik.handleChange}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
        />
        <TextField
            className={styles.input}
            fullWidth
            id={'city'}
            name={'city'}
            label={"Місце народження"}
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
            className={styles.input}
            fullWidth
            id={'jop'}
            name={'jop'}
            label={"Робота"}
            value={formik.values.jop}
            onChange={formik.handleChange}
            error={formik.touched.jop && Boolean(formik.errors.jop)}
            helperText={formik.touched.jop && formik.errors.jop}
        />

        <div className={styles.date}>
            дата народження:
        </div>
        <DateInput
            dateProp={'1999-01-01'}
            onChangeDateValue={setDateBirth}/>
        <div className={styles.wrapbtn}>
            <Button
                disabled={!freeLogin}
                className={styles.button}
                color="primary"
                variant="contained"
                fullWidth
                type="submit">
                Зареєструватися
            </Button>
        </div>

    </form> : <SpinnerBlock/>;


    return (
        <div className={styles.root}>
            {content}
        </div>
    );
};

export default Register;