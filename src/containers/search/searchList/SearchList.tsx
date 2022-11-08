import React, {useEffect, useState} from 'react';
import {useSearch} from "../../../hooks/useSearch/useSearch";
import {useAppSelector} from "../../../hooks/redux";
import PeopleItem from "./peopleItem/PeopleItem";
import {IUserProfile} from "../../../types/profile";

const SearchList = () => {

    const {
        searchPeopleByLogin,
        loadingSearchPeopleByProfile,
        loadingSearchPeopleByLogin,
        searchPeopleByProfile
    } = useSearch();

    const {maritalStatus, name, login, dateBirth, sex, city} = useAppSelector(state => state.user.searchParams);


    const [people, setPeople] = useState<any[]>();

    const onSearch = async () => {

        const res = await searchPeopleByProfile({

            limitPeople: 20,
            maritalStatus, name, login, dateBirth, sex, city
        });

        if(res){
            //ts-ignore
            setPeople(res);
        }

    };


    useEffect(() => {
            onSearch()

    }, [maritalStatus, name, login, dateBirth, sex,city]);

    const list = people?.map((item: any) => {
        return <PeopleItem
            key={item.id}
            {...item} />
    });


    return (
        <div>
            {list}
        </div>
    );
};

export default SearchList;