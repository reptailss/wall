
import styles from './styles.module.scss'

import {useAuth} from "../../../hooks/useAuth/useAuth";
import Menu from "../../../components/menu/Menu";
import {MenuItem} from "@mui/material";
import LogOut from "../../auth/logOut/LogOut";
import SkeletonAvatar from "../../../components/skeletons/SkeletonAvatar";
import AvatarUserSmall from "../../../components/avatarUserSmall/AvatarUserSmall";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../../hooks/redux";

const UserSideBar = () => {
    const {loadingUser} = useAuth();
    const {email,isAuth,id,profile} = useAppSelector(state => state.user);


    const{currentAvatar,name} = profile;





    const content = !loadingUser && isAuth ?
        <Menu
            name={'userSidebar'}
            button={<AvatarUserSmall
            name={name}
            pathImg={currentAvatar}
            />

        }>
            <div>
                {email}
            </div>
            <MenuItem>
                <LogOut/>
            </MenuItem>

        </Menu>
        : <SkeletonAvatar/>;

    return (
        <div className={styles.root}>
           <Button
               disabled={loadingUser && !isAuth }
           component={'div'}>
               {content}
           </Button>
        </div>
    );
};

export default UserSideBar;