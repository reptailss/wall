import Avatar from '@mui/material/Avatar';
import avatarsrc from '../../../resources/svg/avatar/avatar.svg'
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
    const {email,isAuth,id} = useAppSelector(state => state.user);





    const content = !loadingUser && isAuth ?
        <Menu
            name={'userSidebar'}
            button={<AvatarUserSmall
            name={'vova krupin'}
            />

        }>
            <div>
                {email}
            </div>
            <MenuItem>
                {id}
            </MenuItem>
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