import React, {useEffect, useState} from 'react';
import {useSearch} from "../../../hooks/useSearch/useSearch";
import {useAppSelector} from "../../../hooks/redux";
import PeopleItem from "./peopleItem/PeopleItem";

import styles from "../../comments/fullComments/styles.module.scss";
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material'
import {useSnackBar} from "../../../hooks/useSneckBar/useSnackBars";
import SpinnerBlock from "../../../components/spinner/Spinner";
import NotItems from "../../../components/notItems/NotItems";


const SearchList = () => {

    const {
        loadingSearchPeopleByProfile,
        searchPeopleByProfile
    } = useSearch();

    const {
        maritalStatus,
        name,
        login,
        dateBirth,
        sex,
        city
    } = useAppSelector(state => state.user.searchParams);

    const {setSnackBar} = useSnackBar();


    const [loading, setLoading] = useState<boolean>(false);
    const [people, setPeople] = useState<any[]>();


    const onSearch = async () => {

        const res = await searchPeopleByProfile({

            limitPeople: 5,
            //ts-ignore
            maritalStatus, name, login, dateBirth, sex, city
        });
        setPeople(res);
    };


    const onLoadSearch = async () => {
        if (people) {
            setLoading(true);

            const res = await searchPeopleByProfile({
                limitPeople: 5,
                //ts-ignore
                maritalStatus, name, login, dateBirth, sex, city,
                startId: people[people.length - 1].timestamp
            });
            // @ts-ignore
            setPeople(prevState => [...prevState, ...res]);
            if (res && res.length === 0) {
                setSnackBar('більше немає людей за даними параметрами..', 'info');
            }

            setLoading(false);

        }
    };


    useEffect(() => {
        onSearch()
    }, [maritalStatus, name, login, dateBirth, sex, city]);


    const list = people?.map((item: any) => {
        return <PeopleItem
            key={item.id}
            {...item} />
    });


    return (


        <div>
            {loading || loadingSearchPeopleByProfile ? <div className={styles.spinner}>
                <SpinnerBlock/>
            </div> : people && people.length ? list : <div className={styles.notItems}>
                <NotItems text={'немає людей за даними параметрами..'}/>
            </div>
            }

            <div className={styles.onLoad}>
                {people && people.length ? <IconButton
                    disabled={loadingSearchPeopleByProfile}
                    onClick={onLoadSearch}
                    className={styles.btn}>
                    <AddIcon
                        fontSize={'small'}
                    />
                </IconButton> : null}
            </div>
        </div>
    );
};

export default SearchList;