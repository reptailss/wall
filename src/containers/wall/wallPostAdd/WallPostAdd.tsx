

import styles from './styles.module.scss'
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import {validationSchemaAddPostWall} from '../../../constans/validate/wall'
import SpinnerBlock from "../../../components/spinner/Spinner";
import AddImagePost from "./addImagePost/AddImagePost";
import Button from '@mui/material/Button'
import {useWall} from "../../../hooks/useWall/useWall";
import {FC, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useAppSelector} from "../../../hooks/redux";

interface IWallPostAddProps {
    id: string,
}

const WallPostAdd:FC<IWallPostAddProps> = ({id}) => {
    const {id:idUser} = useAppSelector(state => state.user);
    const {name} = useAppSelector(state => state.user.profile);


    const [dataImg,setDataImg] = useState<string[]>([]);

    const onChangeDownload = (img:string[]) => {
        setDataImg(img)
    };

    const {addWallPost,loadingAddWallPost} = useWall();

    const onAddPost = async (text:string) => {
        if(id){
            await addWallPost({
                    id: id,
                    body: {
                        text:text,
                        authorId:idUser,
                        authorName: name,
                        pathImg: dataImg,
                        idUserWhoseWall:id
                    },
                }
            )
        }
    };

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: validationSchemaAddPostWall,
        onSubmit: async (values) => {
            onAddPost(values.text);
            formik.resetForm({});
            setDataImg([]);
        },
    });

    const content = !loadingAddWallPost ? <form
        className={styles.root}
        onSubmit={formik.handleSubmit}
    >

        <div className={styles.innerinput}>
            <TextField
                key={'text'}
                className={styles.input}
                fullWidth
                id={'text'}
                name={'text'}
                label={'Ваше повідомелння...'}
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
                multiline
            />
            <Button
                disabled={loadingAddWallPost}
                className={styles.button}
                color="primary"
                variant="contained"
                fullWidth type="submit">
                <SendIcon/>
            </Button>
        </div>

        <div>
        </div>
    </form>:
        <SpinnerBlock/>;

    return (
        <div className={styles.root}>
            {content}
            <AddImagePost
                onChangeDownload={ onChangeDownload}
                path={`users/${id}/wall`}/>
        </div>
    );
};

export default WallPostAdd;