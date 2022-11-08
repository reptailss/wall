import {collection, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";

import {ISearchPeopleByLoginProps, ISearchPeopleByProfileProps} from "../../types/search";


export function useSearch() {

    const [loadingSearchPeopleByLogin, setLoadingSearchPeopleByLogin] = useState<boolean>(false);
    const [loadingSearchPeopleByProfile, setLoadingSearchPeopleByProfile] = useState<boolean>(false);

    const {setSnackBar} = useSnackBar();


    const searchPeopleByLogin = async (props: ISearchPeopleByLoginProps) => {
        const {
            userId,
            limitPeople,
            orderBySearch = 'desc',
            startId
        } = props;

        setLoadingSearchPeopleByLogin(true);


        const docRef = collection(db,
            "users",
            userId);


        const ref = startId ? query(docRef,
            orderBy("timestamp", orderBySearch),
            limit(limitPeople),
            startAfter(startId))
            : query(docRef,
                orderBy("timestamp", orderBySearch),
                limit(limitPeople));

        const res = await getDocs(ref);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingSearchPeopleByLogin(false);
            return results;


        } catch (error) {
            setLoadingSearchPeopleByLogin(false);
        }
    };


    const searchPeopleByProfile = async (props: ISearchPeopleByProfileProps) => {
        const {
            limitPeople,
            orderBySearch = 'desc',
            startId,
            maritalStatus, name, login, dateBirth, sex, city
        } = props;

        setLoadingSearchPeopleByProfile(true);


        const refWhereActive = city.value || name.value || maritalStatus.value || sex.value;
        const refWhereboolean = !!refWhereActive;

        const docRef = collection(db,
            "users");


        const pathMaritalStatus = maritalStatus.value ? 'maritalStatus' : 'filter';
        const valueMaritalStatus = maritalStatus.value ? maritalStatus.value : true;

        const pathCity = city.value ? 'city' : 'filter';
        const valueCity = city.value ? city.value : true;

        const pathName = name.value ? 'name' : 'filter';
        const valueName = name.value ? name.value : true;

        const pathSex = sex.value ? 'sex' : 'filter';
        const valueSex = sex.value ? sex.value : true;



        const refWhere = refWhereboolean ? query(docRef,
            //ts-ignore
            where(pathMaritalStatus, '==', valueMaritalStatus),
            where(pathCity, '==', valueCity),
            where(pathName, '==', valueName),
            where(pathSex, '==', valueSex),

            limit(limitPeople),
            ) :
            query(docRef,
                limit(limitPeople),
            );


        const res = await getDocs(refWhere);
        try {
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingSearchPeopleByLogin(false);
            return results;


        } catch (error) {
            setLoadingSearchPeopleByLogin(false);
        }


    };


    return {
        loadingSearchPeopleByLogin,
        loadingSearchPeopleByProfile,


        searchPeopleByLogin,
        searchPeopleByProfile,
    };
};