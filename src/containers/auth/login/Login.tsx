import {useFormik} from 'formik';
import {validationSchemaLogin} from '../../../constans/validate/auth'

import SpinnerBlock from "../../../components/spinner/Spinner";
import {useAuth} from "../../../hooks/useAuth/useAuth";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

import styles from './styles.module.scss'
import {useAppDispatch} from "../../../hooks/redux";
import {setCloseModalSignIn} from  "../../../redux/slice/userSlice"

const Login = () => {
    const {loginUser,loadingLogin} = useAuth();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: async (values) => {
           await loginUser(values.email,values.password);
           dispatch(setCloseModalSignIn(true))
            setTimeout(()=>{
                dispatch(setCloseModalSignIn(false))
            },500)

        },
    });

    const content = !loadingLogin ?  <form
        className={styles.root}
        onSubmit={formik.handleSubmit}
    >
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
        <TextField
            className={styles.input}
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>
        <div className={styles.wrapbtn}>
            <Button
                className={styles.button}
                color="primary"
                variant="contained"
                fullWidth type="submit">
                Увійти
            </Button>
        </div>
    </form> : <SpinnerBlock/>;


    return (
        <div className={styles.root}>
            {content}
        </div>
    );
};

export default Login;