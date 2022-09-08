import React, {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import WallPostItem from "../wallPostItem/WallPostItem";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {IWallPostItem} from "../../../types/wall/post";
import {AnimatePresence, motion} from "framer-motion";

interface IWallPostListProps {
    id: string
}

const WallPostList: FC<IWallPostListProps> = ({id}) => {
    const [data, setData] = useState<IWallPostItem[]>([]);

    let unsub = () => {};

    useEffect(() => {
      if(db && id){
           unsub = onSnapshot(
              query(collection(db, "users", id, 'posts'), orderBy('timestamp', 'desc'), limit(5)),
              (snapShot) => {
                  let list: any = [];
                  snapShot.docs.forEach((doc) => {
                      list.push({id: doc.id, ...doc.data()});
                  });
                  setData(list);
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

    const listPost = data.map((item) => {
        return (
            <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{
        type: 'Tween',
        opacity: {duration: 1.2},
        }}
        key={item.id}>
        <WallPostItem
        {...item}/>
        </motion.div>
        )
    });

    return (
        <AnimatePresence>
            <div className={styles.list}>
                {listPost}
            </div>
        </AnimatePresence>
    );
};

export default WallPostList;