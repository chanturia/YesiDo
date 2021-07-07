import React, {useContext, useEffect, useState} from 'react';
import style from '/styles/Home.module.scss'
import asterisk from "/svg/asterisk";
import Modal from 'react-modal';
import FormState1 from "/components/formModal/formState1";
import FormState2 from "/components/formModal/formState2";
import FormState3 from "/components/formModal/formState3";
import {Context} from "/store/Store";

function FormModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    let [currentForm, setCurrentForm] = useState(1);

    const customStyles = {
        overlay: {
            backgroundColor: "rgb(0 0 0 / 90%)",
            zIndex: 999
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: window.isMobile ? "95%" : "40rem",
            overflow: "initial"
        },
    };

    function renderForm(currentForm) {
        switch (currentForm) {
            default:
                return <FormState1/>
            case 1:
                return <FormState1/>
            case 2:
                return <FormState2/>
            case 3:
                return <FormState3/>
        }
    }

    useEffect(() => {
        renderForm(currentForm)
    }, [currentForm])

    useEffect(() => {
        if (state.currentUser?.amComing) {
            setCurrentForm(3)
            return null
        }
        setCurrentForm(Object.keys(state.currentUser).length > 0 ? 2 : 1)
    }, [state.currentUser])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className={style.formTrigger} onClick={openModal}><span className={style.rotating}>{asterisk}</span>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Form modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
            >
                {renderForm(currentForm)}
                <div className={style.closeModal} onClick={() => closeModal()}><span>X</span></div>
            </Modal>
        </>
    );
}

export default FormModal;
