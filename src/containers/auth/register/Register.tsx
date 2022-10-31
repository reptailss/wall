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


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            dateBirth: '',
            city: '',
            jop: '',
            maritalStatus: '',
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
                        currentAvatar: 'https://firebasestorage.googleapis.com/v0/b/blog-f279e.appspot.com/o/avatar.png?alt=media&token=993f58a6-9b02-42d2-910f-9170deaa54c4',
                        uid:res.user.uid,
                        status:'...',
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

        <TextField
            className={styles.input}
            fullWidth
            id={'name'}
            name={'name'}
            label={"ваше ім'я"}
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
        <TextField
            className={styles.input}
            fullWidth
            id={'maritalStatus'}
            name={'maritalStatus'}
            label={"Сімейний статус"}
            value={formik.values.maritalStatus}
            onChange={formik.handleChange}
            error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
            helperText={formik.touched.maritalStatus && formik.errors.maritalStatus}
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