import React, {FC, useEffect, useState} from 'react';
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

    const [closeModal,setCloseModal] = useState<boolean>(false);

    const {isDesktop} = useMedia();
    const fullScreenModal = !isDesktop;


    return (
        <>
            <Modal
                fullScreenModal={fullScreenModal}
                closeModal={closeModal}
                button={<BtnFullComments
                    totalComments={totalComments}
                />}
            >
                <FullComments
                    onCloseModal={(close)=>{
                        setCloseModal(close)
                    }}
                    idUser={idUser}
                    pathRoot={pathRoot}
                    pathItemId={pathItemId}
                />
            </Modal>

        </>
    );
};

export default ModalFullComments;