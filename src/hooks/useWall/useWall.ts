import {addDoc,setDoc, collection, doc, getDoc, serverTimestamp,deleteDoc } from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {IWallAddProps, IWallRemoveProps} from "../../types/wall/post";


export function useWall() {
    const {setSnackBar} = useSnackBar();
    const [loadingAddWallPost, setLoadingAddWallPost] = useState<boolean>(false);
    const [loadingDeleteWallPost, setLoadingDeleteWallPost] = useState<boolean>(false);


    const addWallPost = async (props: IWallAddProps) => {
        setLoadingAddWallPost(true);
        const {id, body} = props;
        try {
            const newAddPostRef = doc(collection(db, "users",id, "posts"));
            await setDoc(newAddPostRef, {
                ...body,
                timestamp: serverTimestamp()
            });
            setSnackBar('ви успішно добавили пост!', 'success');
            setLoadingAddWallPost(false);
        } catch (error: any) {
            setLoadingAddWallPost(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteWallPost = async (props: IWallRemoveProps) => {
        setLoadingDeleteWallPost(true);
        const {idUser, idPost} = props;
        try {
            await deleteDoc(doc(db, "users",idUser, "posts",idPost));
            setSnackBar('ви успішно видалили пост!', 'success');
            setLoadingDeleteWallPost(false);
        } catch (error: any) {
            setLoadingDeleteWallPost(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };





    return {
        loadingAddWallPost,
        loadingDeleteWallPost,

        addWallPost,
        deleteWallPost
    };
}