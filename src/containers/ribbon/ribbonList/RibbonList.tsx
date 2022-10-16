import React, {useEffect, useState} from 'react';
import {IWallPostItem} from "../../../types/wall/post";
import {db} from "../../../firebase/firebase";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {IRibbonItem} from "../../../types/ribbon";
import {useAppSelector} from "../../../hooks/redux";
import RibbonItem from "./ribbonItem/RibbonItem";
import {Row,Col} from 'react-bootstrap'

import styles from './styles.module.scss'

const RibbonList = () => {

const{id} = useAppSelector(state => state.user);

    const [data, setData] = useState<IRibbonItem[]>([]);

    let unsub = () => {};

    useEffect(() => {
        if(db && id){
            unsub = onSnapshot(
                query(collection(db, "users", id, 'ribbon'), orderBy('createRibbonItem', 'desc'), limit(15)),
                (snapShot) => {
                    let list: any = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({id: doc.id, ...doc.data()});
                    });
                    setData(list);
                    console.log(data)
                },
                (error) => {
                    console.log(error);
                }
            );
        }


        return () => {
            unsub();
        };
    }, [db, id]);

    const list = data.map( (item) =>{
        return <RibbonItem
            key={item.id}
            {...item}
        />
    });



    return (
        <Row className={styles.row}>
            <Col sx={12} xl={8}>
                {list}
            </Col>
            <Col sx={12} xl={4}>

            </Col>
        </Row>
    );
};

export default RibbonList;