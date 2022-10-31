import {collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
    query,
    orderBy,
    limit,

} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";
import {
    IFriendsParams,
    IFriendsParamsReverse,
    IFriendsRequestProps,
    IGetFriendsRequestProps,
    ICounterFriendsProps,
    ISetCounterFriendsProps, IGetFriendsConfirmedProps
} from "../../types/friends";



export function useFriends() {


    const {setSnackBar} = useSnackBar();

    const [loadingAddFriendsRequest,
        setLoadingAddFriendsRequest] = useState<boolean>(false);

    const [loadingDeleteFriendsRequest,
        setLoadingDeleteFriendsRequest] = useState<boolean>(false);

    const [loadingAddFriendConfirmed,
        setLoadingAddFriendConfirmed] = useState<boolean>(false);


    const [loadingCheckRequestFriends,
        setLoadingCheckRequestFriends] = useState<boolean>(true);

    const [loadingCheckConfirmFriends,
        setLoadingCheckConfirmFriends] = useState<boolean>(true);


    const [loadingDeleteFriendConfirmed,
        setLoadingDeleteFriendConfirmed] = useState<boolean>(false);

    const [loadingConfirmFriend,
        setLoadingConfirmFriend] = useState<boolean>(false);


    const [loadingGetFriendsRequestUsers,
        setLoadingGetFriendsRequestUsers] = useState<boolean>(true);

    const [loadingGetFriendsConfirmedUsers,
        setLoadingGetFriendsConfirmedUsers] = useState<boolean>(false);

    const [loadingDeleteFriend,
        setLoadingDeleteFriend] = useState<boolean>(false);

    const [loadingCheckFriendStatus,
        setLoadingCheckFriendStatus] = useState<boolean>(true);

    const [loadingDeleteMyRequest,
        setLoadingDeleteMyRequest] = useState<boolean>(false);

    const [loadingDeleteOtherRequest,
        setLoadingDeleteOtherRequest] = useState<boolean>(false);


    const [loadingGetTotal, setLoadingGetTotal] = useState<boolean>(false);

    const [loadingSetTotalRequest,
        setLoadingSetTotalRequest] = useState<boolean>(false);

    const [loadingAddFriend,
        setLoadingAddFriend] = useState<boolean>(false);


    const [statusFriend, setStatusFriend] = useState<'initial'
        | 'myRequest'
        | 'otherRequest'
        | 'confirm'>('initial');

    //base

    const addFriendsRequest = async (params: IFriendsParamsReverse) => {
        setLoadingAddFriendsRequest(true);
        const {props, snack, path, reverse} = params;
        const {userId, currentUserId} = props;
        try {
            const refOtherRequest = doc(db,
                "users",
                userId,
                "friends",
                "list",
                "otherRequest",
                currentUserId);
            const refMyRequest = doc(db,
                "users",
                currentUserId,
                "friends",
                "list",
                "myRequest",
                userId);

            const refOtherRequestReverse = doc(db,
                "users",
                userId,
                "friends",
                "list",
                "myRequest",
                currentUserId);
            const refMyRequestReverse = doc(db,
                "users",
                currentUserId,
                "friends",
                "list",
                "otherRequest",
                userId);

            const ref = path === 'otherRequest' ?
                reverse ? refOtherRequestReverse : refOtherRequest

                : reverse ? refMyRequestReverse : refMyRequest;
            await setDoc(ref, {
                friends: false,
                timestamp: serverTimestamp()
            });
            if (snack) {
                setSnackBar('ви успішно відправили заявку в друзі', 'success');
            }
            setLoadingAddFriendsRequest(false);
        } catch (error: any) {
            setLoadingAddFriendsRequest(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteFriendsRequest = async (params: IFriendsParamsReverse) => {
        setLoadingDeleteFriendsRequest(true);
        const {props, snack, path, reverse} = params;
        const {userId, currentUserId} = props;

        const refOtherRequest = doc(db,
            "users",
            userId,
            "friends",
            "list",
            "otherRequest",
            currentUserId);

        const refMyRequest = doc(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "myRequest",
            userId);


        const refOtherRequestReverse = doc(db,
            "users",
            userId,
            "friends",
            "list",
            "myRequest",
            currentUserId);


        const refMyRequestReverse = doc(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "otherRequest",
            userId);

        const ref = path === 'otherRequest' ?
            reverse ? refOtherRequestReverse : refOtherRequest

            : reverse ? refMyRequestReverse : refMyRequest;

        try {
            await deleteDoc(ref);
            if (snack) {
                setSnackBar('ви успішно відмінили заявку!', 'success');
            }
            setLoadingDeleteFriendsRequest(false);
        } catch (error: any) {
            setLoadingDeleteFriendsRequest(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const addFriendConfirmed = async (params: IFriendsParams) => {
        setLoadingAddFriendConfirmed(true);
        const {props, snack, path} = params;
        const {userId, currentUserId} = props;

        try {
            const refOtherRequest = doc(db,
                "users",
                userId,
                "friends",
                "list",
                "confirmed",
                currentUserId);
            const refMyRequest = doc(db,
                "users",
                currentUserId,
                "friends",
                "list",
                "confirmed",
                userId);

            const ref = path === 'otherRequest' ? refOtherRequest : refMyRequest;
            await setDoc(ref, {
                friends: true,
                timestamp: serverTimestamp()
            });
            if (snack) {
                setSnackBar('ви успішно підтвердили заявку', 'success');
            }
            setLoadingAddFriendConfirmed(false);
        } catch (error: any) {
            setLoadingAddFriendConfirmed(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteFriendConfirmed = async (params: IFriendsParams) => {
        setLoadingDeleteFriendConfirmed(true);

        const {props, snack, path} = params;
        const {userId, currentUserId} = props;


        const refOtherRequest = doc(db,
            "users",
            userId,
            "friends",
            "list",
            "confirmed",
            currentUserId);

        const refMyRequest = doc(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "confirmed",
            userId);

        const ref = path === 'otherRequest' ? refOtherRequest : refMyRequest;

        try {
            await deleteDoc(ref);
            setLoadingDeleteFriendConfirmed(false);
        } catch (error: any) {
            setLoadingDeleteFriendConfirmed(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const checkRequestFriends = async (params: IFriendsParams) => {
        setLoadingCheckRequestFriends(true);
        const {props, snack, path} = params;
        const {userId, currentUserId} = props;


        const refOtherRequest = doc(db,
            "users",
            userId,
            "friends",
            "list",
            "myRequest",
            currentUserId);

        const refMyRequest = doc(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "myRequest",
            userId);

        const ref = path === 'otherRequest' ? refOtherRequest : refMyRequest;
        try {
            const res = await getDoc(ref);
            setLoadingCheckRequestFriends(false);
            if (res.exists()) {
                return true;
            } else {
                return false;
            }

        } catch (error: any) {
            setLoadingCheckRequestFriends(false);
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }
    };


    const checkConfirmFriends = async (params: IFriendsParams) => {
        setLoadingCheckConfirmFriends(true);
        const {props, snack, path} = params;
        const {userId, currentUserId} = props;


        const refOtherRequest = doc(db,
            "users",
            userId,
            "friends",
            "list",
            "confirmed",
            currentUserId);

        const refMyRequest = doc(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "confirmed",
            userId);

        const ref = path === 'otherRequest' ? refOtherRequest : refMyRequest;
        try {
            const res = await getDoc(ref);
            setLoadingCheckConfirmFriends(false);
            if (res.exists()) {
                return true;
            } else {
                return false;
            }

        } catch (error: any) {
            setLoadingCheckConfirmFriends(false);
            setSnackBar(error.code, 'error');
            console.log(error);
            throw  error;
        }
    };


    const getFriendsRequestUsers = async (props: IGetFriendsRequestProps) => {
        const {currentUserId,path} = props;

        const refMyRequest = collection(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "myRequest");


        const refOtherRequest = collection(db,
            "users",
            currentUserId,
            "friends",
            "list",
            "otherRequest");


        const ref = path === 'myRequest' ? refMyRequest : refOtherRequest;
        setLoadingGetFriendsRequestUsers(true);
        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetFriendsRequestUsers(false);
            return results;


        } catch (error) {
            setLoadingGetFriendsRequestUsers(false);
        }
    };


    const getFriendsConfirmedUsers = async (props: IGetFriendsConfirmedProps) => {
        const {userId,
            limitFriend,
            orderByComment='desc',
            startId} = props;

        setLoadingGetFriendsConfirmedUsers(true);


        const docRef = collection(db,
            "users",
            userId,
            "friends",
            "list",
            "confirmed");


        const ref = limitFriend ? query(docRef,
            orderBy("timestamp", orderByComment),
            limit(limitFriend)) : query(docRef,
            orderBy("timestamp", orderByComment));

        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingGetFriendsConfirmedUsers(false);
            return results;


        } catch (error) {
            setLoadingGetFriendsConfirmedUsers(false);
        }
    };

    const getTotalFriends = async (props: ICounterFriendsProps) => {
        setLoadingGetTotal(true);
        const {userId} = props;
        const docRef = doc( db, "users", userId, "friends","counter");
        try {
            const res = await getDoc(docRef);
            setLoadingGetTotal(false);

            if (res.exists()) {
                return res.data();
            } else {
                return {
                    totalConfirm: 0,
                    totalOtherRequest: 0,
                    totalMyRequest: 0,
                }

            }

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingGetTotal(false);
            throw  error;
        }


    };

    const setTotalFriends = async (props: ISetCounterFriendsProps) => {
        setLoadingSetTotalRequest(true);
        const {userId,body} = props;
        const docRef = doc( db, "users", userId, "friends","counter");

        try {
            const res = await getDoc(docRef);
            setLoadingGetTotal(false);

            if (res.exists()) {
                await updateDoc(docRef, {
                    ...body
                });
            } else {
                await setDoc(doc(db, "users", userId, "friends","counter"), {
                    ...body
                });
            }


            setLoadingSetTotalRequest(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingSetTotalRequest(false);
            throw  error;
        }
    };




//custom

    const confirmFriend = async (props: IFriendsRequestProps) => {

        setLoadingConfirmFriend(true);
        const {userId, currentUserId} = props;
        try {

            await deleteFriendsRequest({
                props,
                snack: false,
                path: 'otherRequest'
            });

            await deleteFriendsRequest({
                props,
                snack: false,
                path: 'myRequest'
            });

            await deleteFriendsRequest({
                props,
                snack: false,
                path: 'otherRequest',
                reverse: true
            });

            await deleteFriendsRequest({
                props,
                snack: false,
                path: 'myRequest',
                reverse: true
            });


            await addFriendConfirmed({
                props,
                snack: false,
                path: 'otherRequest'
            });

            await addFriendConfirmed({
                props,
                snack: false,
                path: 'myRequest'
            });

            const totalCurrentUser = await getTotalFriends({
                userId:currentUserId
            });

            const totalUser = await getTotalFriends({
                userId:userId
            });


            await setTotalFriends({
                userId:currentUserId,
                body:{
                    totalConfirm: totalCurrentUser.totalConfirm +1,
                    totalOtherRequest: totalCurrentUser.totalOtherRequest -1,
                }
            });

            await setTotalFriends({
                userId:userId,
                body:{
                    totalConfirm: totalUser.totalConfirm +1,
                    totalMyRequest: totalUser.totalMyRequest -1,
                }
            });

            setLoadingConfirmFriend(false);
        } catch (error: any) {
            setLoadingConfirmFriend(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const deleteFriend = async (props: IFriendsRequestProps) => {
        setLoadingDeleteFriend(true);
        const {currentUserId,userId} = props;

        try {

            await addFriendsRequest({
                props,
                snack: false,
                path: 'otherRequest',
                reverse: true
            });

            await addFriendsRequest({
                props,
                snack: false,
                path: 'myRequest',
                reverse: true
            });


            await deleteFriendConfirmed({
                props,
                snack: false,
                path: 'otherRequest'
            });

            await deleteFriendConfirmed({
                props,
                snack: false,
                path: 'myRequest'
            });

            const totalCurrentUser = await getTotalFriends({
                userId:currentUserId
            });

            const totalUser = await getTotalFriends({
                userId:userId
            });


            await setTotalFriends({
                userId:currentUserId,
                body:{
                    totalConfirm: totalCurrentUser.totalConfirm -1,
                    totalOtherRequest: totalCurrentUser.totalOtherRequest +1
                }
            });

            await setTotalFriends({
                userId:userId,
                body:{
                    totalConfirm: totalUser.totalConfirm -1,
                    totalMyRequest: totalUser.totalMyRequest + 1
                }
            });



            setLoadingDeleteFriend(false);
        } catch (error: any) {
            setLoadingDeleteFriend(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };


    const checkFriendStatus = async (props: IFriendsRequestProps) => {
        setLoadingCheckFriendStatus(true);
        const {userId, currentUserId} = props;
        try {
            setStatusFriend('initial');
            const confirm = await await checkConfirmFriends({
                props: {
                    userId,
                    currentUserId
                },
                snack: false,
                path: 'myRequest'

            });

            if (confirm) {
                setStatusFriend('confirm');
            }

            const otherRequest = await await checkRequestFriends({
                props: {
                    userId,
                    currentUserId
                },
                snack: false,
                path: 'otherRequest'
            });

            if (otherRequest && !confirm) {
                setStatusFriend('otherRequest');
            }
            const myRequest = await checkRequestFriends({
                props: {
                    userId,
                    currentUserId
                },
                snack: false,
                path: 'myRequest'
            });

            if (myRequest && !confirm) {
                setStatusFriend('myRequest');

            }

            setLoadingCheckFriendStatus(false);
        } catch (error: any) {
            setLoadingCheckFriendStatus(false);
            setSnackBar(error.code, 'error');
            throw  error;
        }
    };



    const addFriend = async (props: IFriendsRequestProps) =>{
        const {userId, currentUserId} = props;
        setLoadingAddFriend(true);

       try{
           const totalCurrentUser = await getTotalFriends({
               userId:currentUserId
           });

           const totalUser = await getTotalFriends({
               userId:userId
           });


           await setTotalFriends({
               userId:currentUserId,
               body:{
                   totalMyRequest: totalCurrentUser.totalMyRequest +1
               }
           });

           await setTotalFriends({
               userId:userId,
               body:{
                   totalOtherRequest: totalUser.totalOtherRequest + 1
               }
           });


           await addFriendsRequest({
               props: {
                   userId,
                   currentUserId
               },
               snack: true,
               path: 'otherRequest'
           });
           await addFriendsRequest({
               props: {
                   userId,
                   currentUserId
               },
               snack: true,
               path: 'myRequest'
           });
           setLoadingAddFriend(false);
       } catch (error:any) {
           setLoadingAddFriend(false);
           setSnackBar(error.code, 'error');
           throw  error;
       }

    };
    
    const deleteMyRequest = async (props: IFriendsRequestProps) =>{
        const {userId, currentUserId} = props;

        setLoadingDeleteMyRequest(true);
      try{
          await deleteFriendsRequest({
              props: {
                  userId,
                  currentUserId
              },
              snack: true,
              path: 'otherRequest'
          });

          await deleteFriendsRequest({
              props: {
                  userId,
                  currentUserId
              },
              snack: true,
              path: 'myRequest'
          });

          const totalCurrentUser = await getTotalFriends({
              userId:currentUserId
          });

          const totalUser = await getTotalFriends({
              userId:userId
          });


          await setTotalFriends({
              userId:currentUserId,
              body:{

                  totalMyRequest: totalCurrentUser.totalMyRequest - 1
              }
          });

          await setTotalFriends({
              userId:userId,
              body:{
                  totalOtherRequest: totalUser.totalOtherRequest - 1
              }
          });
          setLoadingDeleteMyRequest(false);

      } catch (error: any) {
          setSnackBar(error.code, 'error');
          console.log(error);
          setLoadingDeleteMyRequest(false);
          throw  error;
      }

    };



    const deleteOtherRequest = async (props: IFriendsRequestProps) =>{
        const {userId, currentUserId} = props;

        setLoadingDeleteOtherRequest(true);
        try{
            await deleteFriendsRequest({
                props: {
                    userId,
                    currentUserId
                },
                snack: true,
                path: 'myRequest'
            });

            const totalCurrentUser = await getTotalFriends({
                userId:currentUserId
            });

            await setTotalFriends({
                userId:currentUserId,
                body:{

                    totalOtherRequest: totalCurrentUser.totalOtherRequest - 1
                }
            });

            setLoadingDeleteOtherRequest(false);

        } catch (error: any) {
            setSnackBar(error.code, 'error');
            console.log(error);
            setLoadingDeleteOtherRequest(false);
            throw  error;
        }

    };


    return {

        loadingAddFriendsRequest,
        loadingDeleteFriendsRequest,
        loadingAddFriendConfirmed,
        loadingCheckRequestFriends,
        loadingDeleteFriendConfirmed,
        loadingConfirmFriend,
        loadingGetFriendsRequestUsers,
        loadingDeleteFriend,
        loadingCheckConfirmFriends,
        statusFriend,
        loadingCheckFriendStatus,
        loadingGetTotal,
        loadingGetFriendsConfirmedUsers,
        loadingDeleteMyRequest,
        loadingDeleteOtherRequest,
        loadingSetTotalRequest,
        loadingAddFriend,

        deleteOtherRequest,
        deleteMyRequest,
        addFriend,
        getFriendsConfirmedUsers,
        checkFriendStatus,
        addFriendsRequest,
        deleteFriendsRequest,
        addFriendConfirmed,
        deleteFriendConfirmed,
        checkRequestFriends,
        checkConfirmFriends,
        getFriendsRequestUsers,
        confirmFriend,
        deleteFriend,

        getTotalFriends,
        setTotalFriends
    };
}