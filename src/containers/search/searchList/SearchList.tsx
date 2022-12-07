import React, {useEffect, useState} from 'react';
import {useSearch} from "../../../hooks/useSearch/useSearch";
import {useAppSelector} from "../../../hooks/redux";
import PeopleItem from "./peopleItem/PeopleItem";
import {ITimestamp} from "../../../types/timestamp";

import styles from "../../comments/fullComments/styles.module.scss";
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import {useSnackBar} from "../../../hooks/useSneckBar/useSnackBars";


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
        if (res) {
            //ts-ignore
            setPeople(res);
            console.log(res)
        }

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
            if(res && res.length === 0){
                setSnackBar('більше немає людей за даними параметрами..', 'info');
            }

            setLoading(false);

        }
    };


    useEffect(() => {
        onSearch()
console.log('search')
    }, [maritalStatus, name, login, dateBirth, sex, city]);





    const list = people?.map((item: any) => {
        return <PeopleItem
            key={item.id}
            {...item} />
    });


    return (


       <div>
           {people && list}

          <div className={styles.onLoad}>
              {people &&  people.length ?   <LoadingButton
                  loading={loadingSearchPeopleByProfile}
                  disabled={loadingSearchPeopleByProfile}
                  onClick={onLoadSearch}
                  className={styles.btn}
                  variant="text" color="secondary">
                  <AddIcon
                      fontSize={'small'}
                  />
              </LoadingButton> : null }
          </div>
       </div>
    );
};

export default SearchList;