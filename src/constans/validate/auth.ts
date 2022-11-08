import * as yup from 'yup';

export  const validationSchemaLogin = yup.object({
    email: yup
        .string().
        email('не вірний формат емайлу')
        .required('введіть емайл'),

    password: yup
        .string()
        .min(8, 'мінімум 8 символів')
        .required('введіть ваш пароль'),
});



export  const validationSchemaRegister = yup.object({
    email: yup
        .string().
        email('не вірний формат емайлу')
        .required('введіть емайл'),
    password: yup
        .string()
        .min(8, 'мінімум 8 символів')
        .required('введіть ваш пароль'),
    name: yup
        .string().required('введіть Імя'),
    login: yup
        .string().required('введіть ваш логін')
        .min(3, 'мінімум 3 символів'),
    surname: yup
        .string().required('ввдеіть призвіще'),
    city: yup
        .string().required('введіть ваше місто'),


});


export  const validationSchemaSendPassword = yup.object({
    email: yup
        .string().
        email('не вірний формат емайлу')
        .required('введіть емайл'),

});

