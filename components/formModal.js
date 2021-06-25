import React, {useState} from 'react';
import style from '/styles/Home.module.scss'
import asterisk from "../svg/asterisk";
import Modal from 'react-modal';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

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
    },
};


function FormModal() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        amount: Yup.number()
            .min(0, 'Too Short!')
            .max(4, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

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
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <Formik
                    initialValues={{
                        firstName: '',
                        amount: '0',
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({errors, touched}) => (
                        <Form>
                            <div>
                                <Field name="firstName" placeholder="First and last name"/>
                                <div>
                                    <span style={{color: "green"}}>first and last name of a main person</span>
                                </div>
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <div className="form-group has-error">
                                    <input  disabled={true} type="text" required="required"/>
                                    <label htmlFor="input" className="control-label">First and last name</label><i
                                    className="bar"/>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" checked="checked"/><i className="helper"/>I'm the
                                        label from a checkbox
                                    </label>
                                </div>
                            </div>
                            <div>
                                <Field as="select" name="amount">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Field>
                                {errors.amount && touched.amount ? (
                                    <div>{errors.lasamount}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field name="email" type="email"/>
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            </div>
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
}

export default FormModal;
