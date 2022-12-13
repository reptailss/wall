import {collection, getDocs, limit, orderBy, query, startAfter, where,startAt} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

import {useSnackBar} from "../useSneckBar/useSnackBars";

import {ISearchPeopleByLoginProps, ISearchPeopleByProfileProps} from "../../types/search";


export function useSearch() {

    const [loadingSearchPeopleByProfile, setLoadingSearchPeopleByProfile] = useState<boolean>(false);

    const {setSnackBar} = useSnackBar();




    const searchPeopleByProfile = async (props: ISearchPeopleByProfileProps) => {
        const {
            limitPeople,
            orderBySearch = 'desc',
            startId,
            maritalStatus, name, login, dateBirth, sex, city
        } = props;

        setLoadingSearchPeopleByProfile(true);


        const refWhereActive = login.value || name.value || maritalStatus.value || sex.value || city.value;
        const refWhereboolean = !!refWhereActive;

        const docRef = collection(db,
            "users");


        const pathMaritalStatus = maritalStatus.value ? 'maritalStatus' : 'filter';
        const valueMaritalStatus = maritalStatus.value ? maritalStatus.value : true;

        const pathSex = sex.value  ? 'sex' : 'filter';
        const valueSex = sex.value  ? sex.value : true;

        const pathCity = city.value && !(city.value === '') ? 'city' : 'filter';
        const valueCity = city.value && !(city.value === '') ? city.value : true;

        const pathName = name.value && !(name.value === '') ? 'name' : 'filter';
        const valueName = name.value && !(name.value === '') ? name.value : true;



        const pathLogin = login.value && !(login.value === '') ? 'id' : 'filter';
        const valueLogin = login.value && !(login.value === '') ? login.value : true;




        const refWhere = refWhereboolean ? startId ? query(docRef,
            //ts-ignore
            where(pathMaritalStatus, '==', valueMaritalStatus),
            where(pathLogin, '==', valueLogin),
            where(pathCity, '==', valueCity),
            where(pathName, '==', valueName),
            where(pathSex, '==', valueSex),
            orderBy("timestamp", 'desc'),
            limit(limitPeople),
            startAfter(startId),
            ) : query(docRef,
            //ts-ignore
            where(pathMaritalStatus, '==', valueMaritalStatus),
            where(pathLogin, '==', valueLogin),
            where(pathCity, '==', valueCity),
            where(pathName, '==', valueName),
            where(pathSex, '==', valueSex),
            orderBy("timestamp", 'desc'),
            limit(limitPeople),
            ) :
           startId ?  query(docRef,
               limit(limitPeople),
               orderBy("timestamp", 'desc'),
               startAfter(startId),

           ) :  query(docRef,
               limit(limitPeople),
               orderBy("timestamp", 'desc'),
           );



        try {

            const res = await getDocs(refWhere);
            const results = (res.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
            setLoadingSearchPeopleByProfile(false);
            return results;


        } catch (error) {
            setLoadingSearchPeopleByProfile(false);
            console.log(error)
        }


    };


    return {
        loadingSearchPeopleByProfile,


        searchPeopleByProfile,
    };
};