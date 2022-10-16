import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    startAfter,
    updateDoc,
} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {IAddEventProps} from "../../types/events";


export function useEvents() {

    const[loadingAddEvent,setLoadingAddEvent] = useState<boolean>(false);

    const {setSnackBar} = useSnackBar();


    const addSubscriptionEvents = async (props:IAddEventProps) =>{
        const{currentUserId,userId,body} = props;

        setLoadingAddEvent(true);

        try {
            const ref = doc(db,
                "users",
                userId,
                "events");

            await setDoc(ref, {

               ...body,
                createEvent: serverTimestamp()
            });
            setLoadingAddEvent(false);
        } catch (error: any) {
            setLoadingAddEvent(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }

    };









    return {


    };
}