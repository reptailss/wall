import {addDoc,setDoc,getDocs, collection, doc, getDoc, serverTimestamp,deleteDoc } from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddLikePostProps,
    IWallAddProps,
    IWallPostMutationProps,

} from "../../types/wall/post";



export function useWall() {
    const {setSnackBar} = useSnackBar();
    const [loadingAddWallPost, setLoadingAddWallPost] = useState<boolean>(false);
    const [loadingDeleteWallPost, setLoadingDeleteWallPost] = useState<boolean>(false);
    const [loadingDeleteLikePost, setLoadingDeleteLikePost] = useState<boolean>(false);
    const [loadingAddLikePost, setLoadingAddLikePost] = useState<boolean>(false);



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


    const deleteWallPost = async (props: IWallPostMutationProps) => {
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

    const addLikePost = async (props: IAddLikePostProps) => {
        setLoadingAddLikePost(true);
       const {idUser,idPost,idCurrentUser} = props;
        try {
            await setDoc(doc(db, "users", idUser, "posts",idPost,"likes",idCurrentUser), {
                like: true
            });
            setSnackBar('ви успішно поставили вподобайку!', 'success');
            setLoadingAddLikePost(false);
        } catch (error: any) {
            setLoadingAddLikePost(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteLikePost = async (props: IAddLikePostProps) => {
        setLoadingDeleteLikePost(true);
        const {idUser,idPost,idCurrentUser} = props;
        try {
            await deleteDoc(doc(db, "users", idUser, "posts",idPost,"likes",idCurrentUser));
            setLoadingDeleteLikePost(false);
        } catch (error: any) {
            setLoadingDeleteLikePost(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    return {
        loadingAddWallPost,
        loadingDeleteWallPost,
        loadingAddLikePost,
        loadingDeleteLikePost,


        addWallPost,
        deleteWallPost,
        addLikePost,
        deleteLikePost
    };
}