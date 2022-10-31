import * as yup from 'yup';


export  const validationSchemaUpdateProfile = yup.object({
    name: yup
        .string().required('введіть Імя')
        .min(2, 'мінімум 2 символа'),

    city: yup
        .string().required('введіть населений пункт')
        .min(2, 'мінімум 3 символа'),

    jop: yup
        .string().required('заповніть вашу роботу')
        .min(2, 'мінімум 3 символа'),

    maritalStatus: yup
        .string().required('введіть ваш сімейний статус')
        .min(2, 'мінімум 3 символа'),


});

export  const validationSchemaUpdateStatus= yup.object({
    status: yup
        .string().required('введіть Імя')
        .min(2, 'мінімум 2 символа'),




});