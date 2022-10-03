import * as yup from 'yup';

export  const validationSchemaAddMessageCombinedChat = yup.object({
    text: yup
        .string()
        .required('Введіть ваше повідомелння..')
        .min(1, 'мінімум 1 символ'),


});
