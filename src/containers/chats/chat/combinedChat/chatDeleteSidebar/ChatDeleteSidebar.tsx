import React, {FC} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "../combinedChatList/styles.module.scss";
import DeleteIcon from '@mui/icons-material/Delete';

interface IChatDeleteSidebarProps {
    deleteMessages:string[]
}

const ChatDeleteSidebar:FC<IChatDeleteSidebarProps> = ({deleteMessages}) => {
    return (
        <div>
            <LoadingButton
                // loading={loadingLoadPageMessages}
                // disabled={loadingLoadPageMessages}
                // onClick={onLoadOldMessages}
                className={styles.btn}
                variant="text" color="secondary">
                <DeleteIcon/>
            </LoadingButton>
        </div>
    );
};

export default ChatDeleteSidebar;