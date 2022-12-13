import styles from './styles.module.scss'
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import {validationSchemaAddPostWall} from '../../../constans/validate/wall'
import {Button} from "@mui/material";
import {FC} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useComments} from "../../../hooks/useComments/useComments";
import {useAppSelector} from "../../../hooks/redux";

interface ICommentAddProps {
    idUser: string,
    idCurrentUser: string,
    pathRoot: string,
    pathItemId: string,
    authorNameComment: string,
    onAddCommentProps: () => void,
    onSetTotalComments: (num: number) => void,
}

const CommentAdd: FC<ICommentAddProps> = ({idUser, pathRoot, pathItemId, idCurrentUser, authorNameComment, onAddCommentProps, onSetTotalComments}) => {


    const{isAuth} = useAppSelector(state => state.user);

    const {
        addComment,
        loadingAddComment,
        getTotalComments,
        setTotalComments,

    } = useComments();
    const onAddComments = async (text: string) => {
        await addComment({
                idUser,
                pathRoot,
                pathItemId,
                authorNameComment,
                text
            }
        )
    };

    const onGetTotalComments = async () => {
        return await getTotalComments({
            idUser,
            pathRoot,
            pathItemId,
        });

    };
    const onSetCounter = async (num: number) => {
        await setTotalComments({
            idUser,
            pathRoot,
            pathItemId,
            totalComments: num
        });

    };

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: validationSchemaAddPostWall,
        onSubmit: async (values) => {

            await onAddComments(values.text);
            formik.resetForm({});
            const oldTotalComments = await onGetTotalComments();
            await onSetCounter(oldTotalComments + 1);
            const newTotalComments = await onGetTotalComments();
            onSetTotalComments(newTotalComments);
            await onAddCommentProps();

        },
    });



    return (
        <div
            className={styles.root}>
            {isAuth ? <form
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
                        label={'Ваш коментар..'}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                        multiline
                    />
                    <Button
                        disabled={loadingAddComment}
                        className={styles.button}
                        color="primary"
                        variant="contained"
                        fullWidth type="submit">
                        <SendIcon/>
                    </Button>
                </div>

                <div>
                </div>
            </form> : null}
        </div>
    );
};

export default CommentAdd;