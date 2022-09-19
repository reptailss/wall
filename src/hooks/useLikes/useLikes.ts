import {setDoc,
    getDocs,
    collection,
    doc
    ,deleteDoc,
    updateDoc,
    getDoc,
    query,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddLikeProps,
    ILikesProps,
    IMutationLikeProps,
    ICounterCommentsProps,
} from "../../types/likes/";
import {ICommentsProps} from "../../types/comments";




export function useLikes() {
    const {setSnackBar} = useSnackBar();

    const [loadingGetLikes, setLoadingGetLikes] = useState<boolean>(false);
    const [loadingDeleteLike, setLoadingDeleteLike] = useState<boolean>(false);
    const [loadingAddLike, setLoadingAddLike] = useState<boolean>(false);
    const [loadingGetTotalLikes, setLoadingGetTotalLikes] = useState<boolean>(false);
    const [loadingSetTotalLikes, setLoadingSetTotalLikes] = useState<boolean>(false);


    //
    // const addLike = async (props: IAddLikeProps) => {
    //     setLoadingAddLike(true);
    //     const {idUser,pathRoot,pathItemId,idCurrentUser,authorNameLike} = props;
    //     try {
    //         await setDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser), {
    //             like: true,
    //             authorNameLike:authorNameLike
    //         });
    //         setSnackBar('ви успішно поставили вподобайку!', 'success');
    //         setLoadingAddLike(false);
    //     } catch (error: any) {
    //         setLoadingAddLike(false);
    //         setSnackBar(error.code, 'error');
    //         throw  error;
    //     }
    // };
    //
    //
    // const deleteLike = async (props: IMutationLikeProps) => {
    //     setLoadingDeleteLike(true);
    //     const {idUser,pathRoot,pathItemId,idCurrentUser} = props;
    //     try {
    //         await deleteDoc(doc(db, "users", idUser, pathRoot,pathItemId,"likes",idCurrentUser));
    //         setLoadingDeleteLike(false);
    //     } catch (error: any) {
    //         setLoadingDeleteLike(false);
    //         setSnackBar(error.code, 'error');
    //         throw  error;
    //     }
    // };
    //
    //
    // const getLikes = async (props:ILikesProps) => {
    //     const {idUser,pathRoot,pathItemId} = props;
    //     const docRef = collection(db, "users",idUser, pathRoot,pathItemId,"likes");
    //     setLoadingGetLikes(true);
    //     const res = await getDocs(docRef);
    //     try{
    //         const results = (res.docs.map((data) => {
    //             return { ...data.data(), id: data.id }
    //         }));
    //         setLoadingGetLikes(false);
    //         return results;
    //
    //
    //     }catch (error) {
    //         setLoadingGetLikes(false);
    //     }
    //
    //
    // };
    //
    //







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




    const getTotalLikes = async (props:ILikesProps) => {
        setLoadingGetTotalLikes(true);
        const {idUser,pathRoot,pathItemId} = props;
        const docRef = doc(db, "users",idUser, pathRoot,pathItemId,);
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
        const {idUser,pathRoot,pathItemId,totalLikes} = props;
        try {
            await updateDoc(doc(db, "users",idUser, pathRoot,pathItemId), {
                totalLikes:totalLikes
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

        getTotalLikes,
        setTotalLikes,
        getLikes,
        addLike,
        deleteLike
    };
}