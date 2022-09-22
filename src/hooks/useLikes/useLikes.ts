import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddLikeProps,
    ICounterCommentsProps,
    IGetLikesProps,
    ILikesProps,
    IMutationLikeProps,
} from "../../types/likes/";
import {IMutationCommentProps} from "../../types/comments";


export function useLikes() {
    const {setSnackBar} = useSnackBar();

    const [loadingGetLikes, setLoadingGetLikes] = useState<boolean>(false);
    const [loadingDeleteLike, setLoadingDeleteLike] = useState<boolean>(false);
    const [loadingAddLike, setLoadingAddLike] = useState<boolean>(false);
    const [loadingGetTotalLikes, setLoadingGetTotalLikes] = useState<boolean>(false);
    const [loadingSetTotalLikes, setLoadingSetTotalLikes] = useState<boolean>(false);
    const [loadingCheckLike, setLoadingSetCheckLike] = useState<boolean>(false);





    const addLike = async (props: IAddLikeProps) => {
        setLoadingAddLike(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser,authorNameLike} = props;
        try {
            await setDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser), {
                like: true,
                authorNameLike:authorNameLike,
                timestamp: serverTimestamp()
            });
            setSnackBar('ви успішно поставили вподобайку!', 'success');
            setLoadingAddLike(false);
        } catch (error: any) {
            setLoadingAddLike(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteLike = async (props: IMutationLikeProps) => {
        setLoadingDeleteLike(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser} = props;
        try {
            await deleteDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser));
            setLoadingDeleteLike(false);
        } catch (error: any) {
            setLoadingDeleteLike(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };



    const checkLike = async (props: IMutationLikeProps) => {
        setLoadingSetCheckLike(true);
        const {idUser,pathRoot,pathItemId,idCurrentUser} = props;
        const docRef = doc(db, "users", idUser, pathRoot, pathItemId,"likes",idCurrentUser);
        try {
            const res = await getDoc(docRef);
            setLoadingSetCheckLike(false);

            if (res.exists()) {
                return res.data().like;
            } else {
                return false;
            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetCheckLike(false);
            throw  error;
        }

    };


    const getLikes = async (props: IGetLikesProps) => {
        const {idUser, pathRoot, pathItemId, limitLikes, orderByLikes} = props;
        const docRef = collection(db, "users", idUser, pathRoot, pathItemId, "likes");
        const queryRef = query(docRef, orderBy("timestamp", orderByLikes), limit(limitLikes));
        setLoadingGetLikes(true);
        const res = await getDocs(queryRef);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetLikes(false);
            return results;


        } catch (error) {
            setLoadingGetLikes(false);
        }
    };


    const getTotalLikes = async (props: ILikesProps) => {
        setLoadingGetTotalLikes(true);
        const {idUser, pathRoot, pathItemId} = props;
        const docRef = doc(db, "users", idUser, pathRoot, pathItemId,);
        try {
            const res = await getDoc(docRef);
            setLoadingGetTotalLikes(false);

            if (res.exists()) {
                return res.data().totalLikes;
            } else {
                return 0;
            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingGetTotalLikes(false);
            throw  error;
        }

    };

    const setTotalLikes = async (props: ICounterCommentsProps) => {
        setLoadingSetTotalLikes(true);
        const {idUser, pathRoot, pathItemId, totalLikes} = props;
        try {
            await updateDoc(doc(db, "users", idUser, pathRoot, pathItemId), {
                totalLikes: totalLikes
            });
            setLoadingSetTotalLikes(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetTotalLikes(false);
            throw  error;
        }
    };


    return {
        loadingAddLike,
        loadingDeleteLike,
        loadingGetLikes,
        loadingGetTotalLikes,
        loadingSetTotalLikes,
        loadingCheckLike,

        checkLike,
        getTotalLikes,
        setTotalLikes,
        getLikes,
        addLike,
        deleteLike
    };
}