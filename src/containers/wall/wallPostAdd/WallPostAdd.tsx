import styles from './styles.module.scss'
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import {validationSchemaAddPostWall} from '../../../constans/validate/wall'
import AddImagePost from "./addImagePost/AddImagePost";
import {Button, Paper} from "@mui/material";
import {useWall} from "../../../hooks/useWall/useWall";
import {FC, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useAppSelector} from "../../../hooks/redux";
import {useRibbon} from "../../../hooks/useRibbon/useRibbon";

import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/router";
import SkeletonText from "../../../components/skeletons/SkeletonText";
import SkeletonPhoto from "../../../components/skeletons/SkeletonPhoto";


interface IWallPostAddProps {
    id: string,
}

const WallPostAdd: FC<IWallPostAddProps> = ({id}) => {
    const {id: idUser, isAuth} = useAppSelector(state => state.user);
    const {name} = useAppSelector(state => state.user.profile);
    const {pathname} = useRouter();
    const [dataImg, setDataImg] = useState<string[]>([]);
    const [resetImg, setResetImg] = useState<boolean>(false);


    const myPage = id === idUser || pathname === '/';

    const onChangeDownload = (img: string[]) => {
        setDataImg(img)
    };

    const {addWallPost, loadingAddWallPost} = useWall();

    const {addFriendsItemRibbon, loadingAddFriendRibbon} = useRibbon();

    const onAddPost = async (text: string) => {
        if (id) {

            const idPost = uuidv4().replace(/-/g, '');

            await addWallPost({
                    id: id,
                    idPost,
                    body: {
                        text: text,
                        authorId: idUser,
                        authorName: name,
                        pathImg: dataImg,
                        idUserWhoseWall: id
                    },
                }
            );

            if (myPage) {
                await addFriendsItemRibbon({
                    body: {
                        text: text,
                        userId: idUser,
                        pathImg: dataImg,
                        type: 'post',
                        idRibbonContent: idPost,
                    },
                    currentUserId: idUser,
                    ribbonItemId: idPost,
                })
            }
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
            setResetImg(true);
            setTimeout(() => {
                setResetImg(false)
            }, 1000)
        },
    });


    return (
        <Paper
            className={styles.root}>
            {isAuth ? <>
                <form
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
                            label={'Ваше повідомелння..'}
                            value={formik.values.text}
                            onChange={formik.handleChange}
                            error={formik.touched.text && Boolean(formik.errors.text)}
                            helperText={formik.touched.text && formik.errors.text}
                            multiline
                            size={'small'}
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
                </form>
            </> : <div className={styles.skeleton}>
                <SkeletonText height={40}/>
            </div>}
            {isAuth ? <AddImagePost
                resetImg={resetImg}
                onChangeDownload={onChangeDownload}
                path={`users/${id}/wall`}/> : <div className={styles.skeletonIcons}><SkeletonPhoto
                width={24}
                height={24}
            /></div>}
        </Paper>
    );
};

export default WallPostAdd;