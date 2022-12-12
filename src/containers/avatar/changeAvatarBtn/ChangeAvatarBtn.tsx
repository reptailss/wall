import React, {FC} from 'react';
import Button from '@mui/material/Button';
import styles from "./styles.module.scss";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

    ;
import {useAppSelector} from "../../../hooks/redux";
import SkeletonText from "../../../components/skeletons/SkeletonText";


interface IChangeAvatarBtnProps {
    text?: string
}

const ChangeAvatarBtn:FC<IChangeAvatarBtnProps> = ({text}) => {

    const{isAuth} = useAppSelector(state => state.user);
    return (


        <>
          <div>
              <div>
                  {isAuth ? <Link href={'/redAvatar'}>
                      <LinkMU underline="none"
                              component="div"
                              color="secondary">
                          <Button
                              component={'div'}
                              className={styles.redAvatarBtn}
                              variant="outlined" color="secondary">
                              {text}
                          </Button>
                      </LinkMU>
                  </Link> :    <SkeletonText
                      height={37}
                  />}
              </div>

          </div>
        </>
    );
};

export default ChangeAvatarBtn;