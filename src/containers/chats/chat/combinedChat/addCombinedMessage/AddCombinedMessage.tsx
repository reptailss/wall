import React, {FC} from 'react';
import {useAppSelector} from "../../../../../hooks/redux";
import {useFormik} from "formik";
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import {useChats} from "../../../../../hooks/useChats/useChats";
import {validationSchemaAddMessageCombinedChat} from "../../../../../constans/validate/chats";
import SpinnerBlock from "../../../../../components/spinner/Spinner";
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';

interface IAddCombinedMessageProps {
    combinedId: string,
    userId: string
}

const AddCombinedMessage: FC<IAddCombinedMessageProps> = ({combinedId, userId}) => {

    const {id} = useAppSelector(state => state.user);


    const {addMessageCombinedChat, loadingAddMessageCombinedChat} = useChats();

    const onAddMessage = async (text: string) => {
        if (id) {
            await addMessageCombinedChat({
                    combinedId,
                    userId,
                    currentUserId: id,
                idMessages:uuidv4().replace(/-/g, ''),
                    body: {
                        text: text,
                        userId: id,
                    },
                }
            )
        }
    };

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: validationSchemaAddMessageCombinedChat,
        onSubmit: async (values) => {
            onAddMessage(values.text);
            formik.resetForm({});
        },
    });


    return (
        <div
            className={styles.inner}
        >
            <Paper
                className={styles.root}>
                <form
                    className={styles.root}
                    onSubmit={formik.handleSubmit}
                >


                    <div className={styles.innerinput}>
                        <TextField

                            size="small"
                            key={'text'}
                            className={styles.input}
                            fullWidth
                            id={'text'}
                            name={'text'}
                            label={'Ваше повідомлення..'}
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={formik.touched.text && formik.errors.text}
                            multiline
                        />
                        <Button
                            disabled={loadingAddMessageCombinedChat}
                            className={styles.button}
                            color="primary"
                            variant="contained"
                            fullWidth type="submit">
                            <SendIcon/>
                        </Button>
                    </div>

                    <div>
                    </div>
                </form>
            </Paper>
        </div>
    );

};

export default AddCombinedMessage;