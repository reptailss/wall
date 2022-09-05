import React, {FC} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "../../../../components/menu/Menu";
import {MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import {useWall} from "../../../../hooks/useWall/useWall";


interface IWallSidebarPostItemProps {
    idPost: string,
    authorId: string
}


const WallSidebarPostItem: FC<IWallSidebarPostItemProps> = ({idPost,authorId}) => {
    const {deleteWallPost} = useWall();

    const onDeletePost = async () => {
        console.log(authorId,' autor');
        console.log(idPost,' post');
        await deleteWallPost({
            idUser:authorId, idPost: idPost
        })
    };


    return (
        <>
            <Menu
                button={
                    <MoreVertIcon/>
                }
                name={'sidebarPostItem'}>

                <MenuItem>
                    <Button variant="outlined" onClick={onDeletePost}>
                        del
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

export default WallSidebarPostItem;
