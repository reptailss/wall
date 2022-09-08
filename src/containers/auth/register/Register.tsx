import styles from './styles.module.scss'
import {useFormik} from 'formik';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import {validationSchemaRegister} from '../../../constans/validate/auth'
import SpinnerBlock from "../../../components/spinner/Spinner";
import {useAuth} from "../../../hooks/useAuth/useAuth";
import {useUsers} from "../../../hooks/useUser/UseUser";
import DateInput from "../../../components/dateInput/DateInput";
import {useState} from "react";


const Register = () => {
    const {registerUser, loadingRegister} = useAuth();
    const {setUserProfile} = useUsers();
    const [dateBirth, setDateBirth] = useState<number>(810413076);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            dateBirth: '',
            city: '',
            jop: '',
            maritalStatus: ''
        },
        validationSchema: validationSchemaRegister,
        onSubmit: async (values) => {
            console.log('sub')
            const {name, surname, city, jop, maritalStatus,email,password} = values;
            const res = await registerUser(email,password);
            await setUserProfile({
                    id: res.id,
                    body: {
                        name, surname, dateBirth, city, jop, maritalStatus
                    }
                }
            );


        },
    });



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