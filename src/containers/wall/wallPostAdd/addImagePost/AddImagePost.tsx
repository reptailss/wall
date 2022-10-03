import {FC, useEffect, useRef, useState} from 'react'

import {storage} from "../../../../firebase/firebase";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

import {AnimatePresence, motion} from "framer-motion";

import ClearIcon from '@mui/icons-material/Clear';
import {Button, IconButton} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import SpinnerBlock from "../../../../components/spinner/Spinner";

import styles from './styles.module.scss'

interface IAddImagePostProps {
    path: string,
    onChangeDownload: (img: string[]) => void,
}


const AddImagePost: FC<IAddImagePostProps> = ({path, onChangeDownload}) => {
    const [file, setFile] = useState<any>();
    const [dataImg, setDataImg] = useState<string[]>([]);
    const [per, setPerc] = useState<null | number>(null);


    useEffect(() => {
        onChangeDownload(dataImg);
    }, [dataImg]);

    useEffect(() => {
        const uploadFile = () => {
            if ((file.name)) {
                const name = new Date().getTime() + file.name;
                const pathImg = `images/${path}/${name}`;

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
                            setDataImg([...dataImg, downloadURL]);
                        });
                    }
                );
            }
        };
        file && uploadFile();
    }, [file]);

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }

    };
    const OnChangeFile = (e: any) => {
        setFile(e.target.files[0])
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
            className={styles.btn}
            disabled={per !== null && per < 100}
        >
            <PhotoCamera/>
        </Button>
    </div>;

    const listImg = dataImg && dataImg.map((item, i) => {

        const desertRef = ref(storage, item);

        const onDelete = () => {
            setDataImg(dataImg.filter(el => el !== item));
            onDeleteStorage();
        };

        const onDeleteStorage = () => {
            deleteObject(desertRef).then(() => {

            }).catch((error) => {
                console.log(error)
                throw error;
            });
        };

        return (
            <motion.div
                className={styles.itemImg}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.2},
                }}
                key={item}>
                <img
                    className={styles.img}
                    src={item} alt=""/>
                <IconButton
                    size="small"
                    className={styles.iconBtn}
                    onClick={(e) => onDelete()}
                    aria-label="delete">
                    <ClearIcon fontSize="small"/>
                </IconButton>


            </motion.div>
        )
    });

    return (
        <div className={styles.root}>
            {!(per !== null && per < 100) ? content : <SpinnerBlock/>}
            <AnimatePresence>
                <div className={styles.list}>
                    {dataImg && listImg}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default AddImagePost;