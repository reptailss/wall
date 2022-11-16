import React, {useEffect, useState} from 'react';
import Link from "next/link";
import LinkMU from '@mui/material/Link'

import styles from './styles.module.scss'
import {Paper, Typography} from "@mui/material";
import UserSidebarItem from "./userSidebarItem/UserSidebarItem";
import {IUserProfile} from "../../../types/profile";
import {useUsers} from "../../../hooks/useUser/UseUser";

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/scrollbar";
import {Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useAppSelector} from "../../../hooks/redux";


export const UsersBreakpoints = {
    50: {
        slidesPerView: 2,
    },

    400: {
        slidesPerView: 3,
    },
    600: {

        slidesPerView: 5,
    },
    900: {

        slidesPerView: 8,
    },
    1200: {

        slidesPerView: 8,
    },
};


const NewUsersSidebar = () => {

    const [users, setUsers] = useState<any>();

    const {id:currentUserId} = useAppSelector(state => state.user);

    const {getNewUsers, loadingGetNewUsers} = useUsers();

    const onGetNewUsers = async () => {
        const res = await getNewUsers({limitUsers: 10});
        if (res && res.length) {
            setUsers(res);
        }
        console.log(res)
    };


    useEffect(() => {
        onGetNewUsers();
    }, []);





    const itemsSlide = users && users.map((item: IUserProfile) => {
        const myPage = item.id === currentUserId;
        if(myPage){
            return
        }
        return (
            <SwiperSlide key={item.id}>
                <UserSidebarItem
                    loadingGetNewUsers={loadingGetNewUsers}
                    {...item}/>
            </SwiperSlide>
        )
    });


    return (
        <div className={styles.root}>
            <Paper className={styles.info}>
                <Typography
                    color={'text.other'}
                    variant={'body2'}
                >
                    недавно зареєстровані користувачі
                </Typography>

                <Link href={'/search'}>
                    <LinkMU underline="none"
                            component="div"
                            color="secondary">
                        <Typography
                            className={styles.full}
                            variant={'body2'}
                        >
                            всі
                        </Typography>
                    </LinkMU>
                </Link>

            </Paper>

            <div className={styles.slider}>
                <Swiper
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    modules={[Scrollbar]}
                    breakpoints={UsersBreakpoints}
                    spaceBetween={10}
                >
                    {itemsSlide}
                </Swiper>
            </div>
        </div>
    )
};

export default NewUsersSidebar;