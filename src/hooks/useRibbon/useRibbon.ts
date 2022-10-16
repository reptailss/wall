import {doc,
    serverTimestamp,
    setDoc,
    collection} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {IAddFriendRibbonItemProps,
    IAddRibbonItemProps} from "../../types/ribbon";
import {useFriends} from "../useFriends/useFriends";


export function useRibbon() {

    const [loadingAddFriendRibbon, setLoadingAddFriendRibbon] = useState<boolean>(false);

    const {setSnackBar} = useSnackBar();

    const {getFriendsConfirmedUsers} = useFriends();


    const addItemRibbons = async (props: IAddRibbonItemProps) => {
        const {userId, body} = props;


        try {
            const ref = doc(collection(db, "users",
                userId,
                "ribbon",));

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

        const {body, currentUserId} = props;

        setLoadingAddFriendRibbon(true);

        const friends = await getFriendsConfirmedUsers({
            userId: currentUserId
        });

        if (friends) {
            friends.map(async (friend) => {
                await addItemRibbons({
                    body,
                    userId: friend.id
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




    return {

        loadingAddFriendRibbon,

        addFriendsItemRibbon

    };
}