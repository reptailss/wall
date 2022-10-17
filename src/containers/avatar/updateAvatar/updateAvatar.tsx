import React, {useRef, useState} from 'react'

import styles from './styles.module.scss'
import {Button} from '@mui/material'
import {storage} from "../../../firebase/firebase";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {AnimatePresence, motion} from "framer-motion";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SpinnerBlock from "../../../components/spinner/Spinner";
import {useAppSelector} from "../../../hooks/redux";
import {useAvatar} from '../../../hooks/useAvatar/useAvatar'
import {useUsers} from "../../../hooks/useUser/UseUser";
import {useRouter} from "next/router";
import AvatarEditors from "../../../components/avatarEditors/AvatarEditors";
import {useWall} from "../../../hooks/useWall/useWall";
import {useRibbon} from "../../../hooks/useRibbon/useRibbon";

import {v4 as uuidv4} from 'uuid';


const UpdateAvatar = () => {
    const [file, setFile] = useState<any>();
    const [dataImg, setDataImg] = useState<string>();
    const [per, setPerc] = useState<null | number>(null);
    const {id} = useAppSelector(state => state.user);
    const router = useRouter();
    const {
        updateCurrentAvatar,
        addAvatarsCollection,
    } = useAvatar();

    const {name} = useAppSelector(state => state.user.profile);

    const {getUserProfile} = useUsers();

    const {addWallPost, loadingAddWallPost} = useWall();

    const {loadingAddFriendRibbon, addFriendsItemRibbon} = useRibbon();


    const uploadFile = () => {
        if ((file.name)) {
            const name = new Date().getTime() + file.name;
            const pathImg = `users/${id}/avatar/${name}`;

            const storageRef = ref(storage, pathImg);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPerc(progress);
                    switch (snapshot.state) {
                        case "paused":
                            break;
                        case "running":
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setDataImg(downloadURL);
                    });
                }
            );
        }
    };


    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const addImageFile = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
        if (dataImg) {
            setDataImg('')
        }

    };
    const OnChangeFile = (e: any) => {
        setFile(e.target.files[0])
    };

    const onDelete = () => {
        const desertRef = ref(storage, dataImg);
        deleteObject(desertRef).then(() => {
        }).catch((error) => {
            console.log(error)
            throw error;
        });
        setDataImg('');
    };


    const onUpdateCurrentAvatar = async () => {
        if (dataImg && id) {
            const idAvatar = uuidv4().replace(/-/g, '');
            const idPost = uuidv4().replace(/-/g, '');

            file && await uploadFile()
            await updateCurrentAvatar({id, pathImg: dataImg});

            await addAvatarsCollection({
                id,
                pathImg: dataImg,
                idAvatar: idAvatar,
            });
            await getUserProfile(id);
            router.push('/');

            if (id) {
                await addWallPost({
                        id: id,
                        idPost,
                        body: {
                            text: 'update Avatar',
                            authorId: id,
                            authorName: name,
                            pathImg: [dataImg],
                            idUserWhoseWall: id,
                            type: 'updateAvatar',
                            idAvatar: idAvatar
                        },
                    }
                );

                await addFriendsItemRibbon({
                    currentUserId: id,
                    body: {
                        type: 'updateAvatar',
                        userId: id,
                        pathImg: [dataImg],
                        idRibbonContent: idAvatar
                    }
                })
            }
        }
    };

    const onChangeAvatar = async (img: string) => {
        setDataImg(img);
    };


    const content = <div className={styles.rootAddImg}>
        <input
            accept=".png, .jpg, .jpeg"
            style={{display: 'none'}}
            type="file"
            id="file"
            ref={hiddenFileInput}
            onChange={(e) => OnChangeFile(e)}
        />
        <Button
            onClick={addImageFile}
            variant="contained"
            className={styles.btn}
            disabled={per !== null && per < 100}
            size="small"
        >
            <span> додати нове фото</span>
            <PhotoCamera/>
        </Button>
    </div>;

    return (
        <div className={styles.root}>

            <div className={styles.row}>
                <div className={styles.btns}>
                    {!(per !== null && per < 100) ? content : <SpinnerBlock/>}
                </div>
                <div>
                    <div>
                        <AvatarEditors
                            file={file}
                            onSaveAvatar={onChangeAvatar}/>
                    </div>
                    <AnimatePresence>
                        {dataImg && <motion.div
                            className={styles.imgroot}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{
                                type: 'Tween',
                                opacity: {duration: 1.2},
                            }}
                            key="img">
                            <img
                                className={styles.img}
                                src={dataImg} alt=""/>


                            <div className={styles.btnWrap}>
                                <Button
                                    onClick={onDelete}
                                    variant="contained"
                                    disabled={per !== null && per < 100}
                                    size="small"
                                    className={styles.btnImg}
                                >
                                    <span> Очистити</span>
                                    <ClearIcon
                                        fontSize="small"
                                    />
                                </Button>
                                <Button
                                    onClick={onUpdateCurrentAvatar}
                                    variant="contained"
                                    disabled={per !== null && per < 100}
                                    size="small"
                                    className={styles.btnImg}
                                >
                                    <span> Оновити аватар</span>
                                    <SaveIcon
                                        fontSize="small"
                                    />
                                </Button>
                            </div>


                        </motion.div>}
                    </AnimatePresence>
                </div>


            </div>


        </div>
    );
};

export default UpdateAvatar;