import React, {useContext, useEffect, useState} from 'react';
import style from '/styles/Home.module.scss'
import asterisk from "/svg/asterisk";
import Modal from 'react-modal';
import FormState1 from "/components/formModal/formState1";
import FormState2 from "/components/formModal/formState2";
import {Context} from "/store/Store";

function FormModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    let [currentForm, setCurrentForm] = useState(1);

    const nextForm = () => {
        if (currentForm < 2) {
            setCurrentForm(2)
        }
    }
    const customStyles = {
        overlay: {
            backgroundColor: "rgb(0 0 0 / 75%)",
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
    useEffect(() => {
        setCurrentForm(Object.keys(state.currentUser).length > 0 ? 2 : 1)
    }, [state.currentUser])

    function renderForm() {
        if (currentForm === 1) {
            return <FormState1 nextForm={nextForm}/>
        } else {
            return <FormState2/>
        }
    }

    useEffect(() => {
        renderForm()
    }, [currentForm])

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
                {renderForm()}
                <div className={style.closeModal} onClick={() => closeModal()}><span>X</span></div>
            </Modal>
        </>
    );
}

export default FormModal;
