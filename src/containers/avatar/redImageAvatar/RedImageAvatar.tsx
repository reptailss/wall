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
import {Col, Row} from "react-bootstrap";
import {useAppSelector} from "../../../hooks/redux";
import {useAvatar} from '../../../hooks/useAvatar/useAvatar'
import {useUsers} from "../../../hooks/useUser/UseUser";
import {useRouter} from "next/router";
import AvatarEditors from "../../../components/avatarEditors/AvatarEditors";


const RedImageAvatar = () => {
    const [file, setFile] = useState<any>();
    const [dataImg, setDataImg] = useState<string>();
    const [per, setPerc] = useState<null | number>(null);
    const {id} = useAppSelector(state => state.user);
    const router = useRouter();
    const {updateCurrentAvatar, loadingUpdateCurrentAvatar, addAvatarsCollection} = useAvatar();
    const {getUserProfile} = useUsers();

    //
    // useEffect(() => {
    //     const uploadFile = () => {
    //         if ((file.name)) {
    //             const name = new Date().getTime() + file.name;
    //             const pathImg = `users/${id}/avatar/${name}`;
    //
    //             const storageRef = ref(storage, pathImg);
    //             const uploadTask = uploadBytesResumable(storageRef, file);
    //
    //             uploadTask.on(
    //                 "state_changed",
    //                 (snapshot) => {
    //                     const progress =
    //                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                     setPerc(progress);
    //                     switch (snapshot.state) {
    //                         case "paused":
    //                             console.log("Upload is paused");
    //                             break;
    //                         case "running":
    //                             console.log("Upload is running");
    //                             break;
    //                         default:
    //                             break;
    //                     }
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                 },
    //                 () => {
    //                     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                         setDataImg(downloadURL);
    //                     });
    //                 }
    //             );
    //         }
    //     };
    //     file && uploadFile();
    // }, []);


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
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
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
    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
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
            onClick={handleClick}
            variant="contained"
            className={styles.btn}
            disabled={per !== null && per < 100}
            size="small"
        >
            <span> додати нове фото</span>
            <PhotoCamera/>
        </Button>
    </div>;

    const onUpdateCurrentAvatar = async () => {
        if (dataImg && id) {
            file && await uploadFile()
            await updateCurrentAvatar({id, pathImg: dataImg});
            await addAvatarsCollection({id, pathImg: dataImg});
            await getUserProfile(id);
            router.push('/');
        }
    };

    const onChangeAvatar = async (img: string) => {
        console.log('effect')
        setDataImg(img);

    };


    return (
        <div className={styles.root}>
            <div className={styles.test}>
                <AvatarEditors
                    file={file}
                    onSaveAvatar={onChangeAvatar}/>
            </div>
            <Row className={styles.row}>

                <Col xl={8}>
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
                                    <span> Зберегти</span>
                                    <SaveIcon
                                        fontSize="small"
                                    />
                                </Button>
                            </div>


                        </motion.div>}
                    </AnimatePresence>
                </Col>

                <Col xl={2}>
                    {!(per !== null && per < 100) ? content : <SpinnerBlock/>}
                </Col>

            </Row>


        </div>
    );
};

export default RedImageAvatar;