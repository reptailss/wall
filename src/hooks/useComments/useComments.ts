import {setDoc,
    getDocs,
    collection,
    deleteDoc,
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
    addDoc,
    query,
    orderBy,
    limit,
    startAfter,
    getDoc
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddCommentProps,
    ICommentsProps, ICounterCommentsProps,
    IMutationCommentProps, ISetCounterCommentsProps

} from "../../types/comments/";
import {IUpdateUserProfileProps} from "../../types/profile";



export function useComments() {
    const {setSnackBar} = useSnackBar();

    const [loadingGetComments, setLoadingGetComments] = useState<boolean>(false);
    const [loadingDeleteComment, setLoadingDeleteComment] = useState<boolean>(false);
    const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);
    const [loadingGetTotalComments, setLoadingGetTotalComments] = useState<boolean>(false);
    const [loadingSetTotalComments, setLoadingSetTotalComments] = useState<boolean>(false);






    const addComment = async (props: IAddCommentProps) => {
        setLoadingAddComment(true);
        const {idUser,pathRoot,pathItemId,authorNameComment,text} = props;
        const newCommentRef = doc(collection(db, "users", idUser, pathRoot,pathItemId,"comments"));
        try {
            await setDoc(newCommentRef, {
                authorNameComment,
                idUser,
                text,
                timestamp: serverTimestamp()
            });
            setLoadingAddComment(false);
        } catch (error: any) {
            setLoadingAddComment(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteComment = async (props: IMutationCommentProps) => {
        setLoadingDeleteComment(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser} = props;
        try {
            await deleteDoc(doc(db, "users", idUser, pathRoot,pathItemId,"comments",idCurrentUser));
            setLoadingDeleteComment(false);
        } catch (error: any) {
            setLoadingDeleteComment(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };



    const getComments = async (props:ICommentsProps) => {
        const {idUser,pathRoot,pathItemId,limitComment,orderByComment} = props;
        // const docRef = collection(db, "users",idUser, pathRoot,pathItemId,"comments");
        const docRef = collection(db, "users",idUser, pathRoot,pathItemId,"comments");
        const queryRef = query(docRef, orderBy("timestamp",orderByComment), limit(limitComment));
        setLoadingGetComments(true);
        const res = await getDocs(queryRef);
        try{
            const results = (res.docs.map((data) => {
                return { ...data.data(), id: data.id }
            }));
            setLoadingGetComments(false);
            return results;


        }catch (error) {
            setLoadingGetComments(false);
        }
    };


    const getTotalComments = async (props:ICounterCommentsProps) => {
        setLoadingGetTotalComments(true);
        const {idUser,pathRoot,pathItemId} = props;
        const docRef = doc(db, "users",idUser, pathRoot,pathItemId,);
        try {
            const res = await getDoc(docRef);
            setLoadingGetTotalComments(false);

            if (res.exists()) {
                return res.data().totalComments;
            } else {
                return 0;
            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingGetTotalComments(false);
            throw  error;
        }

    };

    const setTotalComments = async (props: ISetCounterCommentsProps) => {
        setLoadingSetTotalComments(true);
        const {idUser,pathRoot,pathItemId,totalComments} = props;
        try {
            await updateDoc(doc(db, "users",idUser, pathRoot,pathItemId), {
                totalComments:totalComments
            });
            setLoadingSetTotalComments(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetTotalComments(false);
            throw  error;
        }
    };


    return {
        loadingAddComment,
        loadingDeleteComment,
        loadingGetComments,
        loadingGetTotalComments,
        loadingSetTotalComments,

        getTotalComments,
        setTotalComments,
        getComments,
        addComment,
        deleteComment
    };
}