import {doc,
    serverTimestamp,
    setDoc,
    collection,
    deleteDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IAddFriendRibbonItemProps,
    IAddRibbonItemProps, IDeleteFriendRibbonItemProps, IDeleteRibbonItemProps
} from "../../types/ribbon";
import {useFriends} from "../useFriends/useFriends";


export function useRibbon() {

    const [loadingAddFriendRibbon, setLoadingAddFriendRibbon] = useState<boolean>(false);
    const [loadingDeleteFriendRibbon, setLoadingDeleteFriendRibbon] = useState<boolean>(false);

    const {setSnackBar} = useSnackBar();

    const {getFriendsConfirmedUsers} = useFriends();


    const addItemRibbons = async (props: IAddRibbonItemProps) => {
        const {userId, body,ribbonItemId} = props;


        try {
            const ref = doc(db, "users",
                userId,
                "ribbon",ribbonItemId);

            await setDoc(ref, {
                ...body,
                createRibbonItem: serverTimestamp()
            });

        } catch (error: any) {
            setLoadingAddFriendRibbon(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const addFriendsItemRibbon = async (props: IAddFriendRibbonItemProps) => {

        const {body, currentUserId,ribbonItemId} = props;

        setLoadingAddFriendRibbon(true);

        const friends = await getFriendsConfirmedUsers({
            userId: currentUserId
        });

        if (friends) {
            friends.map(async (friend) => {
                await addItemRibbons({
                    body,
                    userId: friend.id,
                    ribbonItemId
                })
            });
        }

        setLoadingAddFriendRibbon(false);

        try {

        } catch (error: any) {
            setLoadingAddFriendRibbon(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }

    };




    const deleteItemRibbons = async (props: IDeleteRibbonItemProps) => {
        const {userId,ribbonItemId} = props;


        try {
            const ref = doc(db, "users",
                userId,
                "ribbon",ribbonItemId);

            await deleteDoc(ref);

        } catch (error: any) {
            setLoadingAddFriendRibbon(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };



    const deleteFriendsItemRibbon = async (props: IDeleteFriendRibbonItemProps) => {

        const {currentUserId,ribbonItemId} = props;

        setLoadingDeleteFriendRibbon(true);

        const friends = await getFriendsConfirmedUsers({
            userId: currentUserId
        });

        if (friends) {
            friends.map(async (friend) => {
                await deleteItemRibbons({
                    userId: friend.id,
                    ribbonItemId
                })
            });
        }

        setLoadingDeleteFriendRibbon(false);

        try {

        } catch (error: any) {
            setLoadingAddFriendRibbon(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }

    };





    return {

        loadingAddFriendRibbon,
        loadingDeleteFriendRibbon,

        addFriendsItemRibbon,
        deleteFriendsItemRibbon,

    };
}