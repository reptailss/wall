import React, {FC} from 'react';
import Modal from "../../modal/Modal";
import SignInPage from "../../../screen/signInPage/SignInPage";
import useMedia from "../../../hooks/useMedia/useMedia";
import {useAppSelector} from "../../../hooks/redux";

interface ModalSignInProps {
    openModal:boolean
}


const ModalSignIn:FC<ModalSignInProps> = ({openModal}) => {

    const{isTablet,isDesktop}= useMedia();
    const{closeModalSignIn} = useAppSelector(state => state.user);
    const widthModal = isTablet || isDesktop ? '70vw' : '95vw';
    const heightModal = isTablet || isDesktop ? '70vh' : '95vh';

    return (

        <div>
            <Modal
                closeModal={closeModalSignIn}
                padding={'0'}
                notButton
                width={widthModal}
                height={heightModal}
                openModal={openModal}
                buttonClose
            >
               <SignInPage
               modal/>
            </Modal>
        </div>
    );
};

export default ModalSignIn;