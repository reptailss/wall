import * as yup from 'yup';

export  const validationSchemaAddPostWall = yup.object({
    text: yup
        .string()
        .required('Введіть ваше повідомелння..')
        .min(2, 'мінімум 2 символа'),


});
