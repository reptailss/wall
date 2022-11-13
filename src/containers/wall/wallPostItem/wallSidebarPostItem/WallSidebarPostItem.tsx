import React, {FC} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "../../../../components/menu/Menu";
import {MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import {useWall} from "../../../../hooks/useWall/useWall";
import DeleteIcon from '@mui/icons-material/Delete';
import {IWallPostMutationProps} from "../../../../types/wall/post";
import {useRibbon} from "../../../../hooks/useRibbon/useRibbon";
import {useAppSelector} from "../../../../hooks/redux";




const WallSidebarPostItem: FC<IWallPostMutationProps> = ({idPost,idUser}) => {

    const{id} = useAppSelector(state => state.user);
    const {deleteWallPost,loadingDeleteWallPost} = useWall();
    const{deleteFriendsItemRibbon,loadingDeleteFriendRibbon} = useRibbon();

    const myPost = idUser === id;

    const onDeletePost = async () => {
        await deleteWallPost({
            idUser:idUser, idPost: idPost
        });
        if(myPost){
           await deleteFriendsItemRibbon({
                currentUserId:id,
                ribbonItemId:idPost
            })
        }
    };

    return (
        <>
            <Menu
                button={
                    <MoreVertIcon/>
                }
                name={'sidebarPostItem'}>

                <MenuItem>
                    <Button disabled={loadingDeleteWallPost} variant="outlined" onClick={onDeletePost}>
                        <DeleteIcon/>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

export default WallSidebarPostItem;
