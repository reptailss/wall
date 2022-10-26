import React, {FC} from 'react';
import Modal from "../../../components/modal/Modal";
import BtnFullComments from './BtnFullComments'

import FullComments from "./FullComments";
import useMedia from "../../../hooks/useMedia/useMedia";

interface ICommentListProps {
    idUser: string,
    pathRoot: string,
    pathItemId: string,
    totalComments: number

}

const ModalFullComments: FC<ICommentListProps> = ({idUser, pathRoot, pathItemId, totalComments}) => {

    const {isDesktop} = useMedia();
    const fullScreenModal = !isDesktop;

    return (
        <>
            <Modal
                fullScreenModal={fullScreenModal}
                button={<BtnFullComments
                    totalComments={totalComments}
                />}
            >
                <FullComments
                    idUser={idUser}
                    pathRoot={pathRoot}
                    pathItemId={pathItemId}
                />
            </Modal>

        </>
    );
};

export default ModalFullComments;