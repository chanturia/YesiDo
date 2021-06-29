import React, {useState} from 'react';
import style from '/styles/Home.module.scss'
import asterisk from "../svg/asterisk";
import Modal from 'react-modal';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation'
import {
    Button, createMuiTheme,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel, Grid,
    InputLabel,
    MenuItem, Paper,
    Radio, Step, StepLabel, Stepper, ThemeProvider, Typography
} from '@material-ui/core';
import {RadioGroup, Select, TextField, CheckboxWithLabel} from 'formik-material-ui';
import {Animated} from "react-animated-css";


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
        width: "40rem"
    },
};
const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#274d4e',
        },
    },
});

function FormModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const {t, lang} = useTranslation('common')

    function openModal() {
        setIsOpen(true);
    }

    console.log(lang);

    const SignupSchema = Yup.object().shape({
        firstAndLastName: Yup.string()
            .min(2, 'Please provide more data!')
            .max(100, 'Too long name')
            .required('Required'),
        amComing: Yup.string()
            .matches(/(yes|no)/)
            .required('Required'),
        amount: Yup.number()
            .when('amComing', {
                is: 'yes',
                then: Yup.number().required('Required')
            }),
        needHelpWithTransfer: Yup.boolean()
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
                        amount: 1,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({values, errors, touched}) => (
                        <ThemeProvider theme={theme}>
                            <Form>
                                <div>
                                    <FormControl className={style.foolWidthField} style={{marginTop: 0}}>
                                        <Field
                                            required
                                            component={TextField}
                                            name="firstAndLastName"
                                            type="text"
                                            label="First and last name"
                                            helperText="First and last name of a main person"
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl className={style.foolWidthField}
                                                 component="fieldset"
                                                 required
                                                 error={errors.amComing && touched.amComing}>
                                        <FormLabel component="legend">Are you coming</FormLabel>
                                        <Field component={RadioGroup} name="amComing">
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio color="primary"/>}
                                                label="Yes i am coming"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio color="primary"/>}
                                                label="Unfortunately i can not"
                                            />
                                        </Field>
                                        {errors.amComing && touched.amComing &&
                                        <FormHelperText>{errors.amComing}</FormHelperText>
                                        }
                                    </FormControl>
                                </div>
                                {values.amComing === 'yes' &&
                                <div>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut"
                                              isVisible={values.amComing === 'yes'}>
                                        <div>
                                            <FormControl className={style.foolWidthField}>
                                                <InputLabel>Persons</InputLabel>
                                                <Field
                                                    component={Select}
                                                    name="amount"
                                                >
                                                    <MenuItem value={1}>Only Me</MenuItem>
                                                    <MenuItem value={2}>2 persons</MenuItem>
                                                    <MenuItem value={3}>3 persons</MenuItem>
                                                    <MenuItem value={4}>4 persons</MenuItem>
                                                </Field>
                                                <FormHelperText>Persons that are coming with you</FormHelperText>
                                            </FormControl>
                                        </div>
                                    </Animated>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={200}
                                              isVisible={values.amComing === 'yes'}>
                                        <FormControl className={style.foolWidthField}><Field
                                            color="primary"
                                            required
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="needHelpWithTransfer"
                                            indeterminate={false}
                                            Label={{label: 'I need help with transfer'}}
                                        />
                                            <FormHelperText>If you dont have car or dont know how to come to the place
                                                select the checkbox and we will try to help you</FormHelperText>
                                        </FormControl>
                                    </Animated>
                                </div>
                                }
                                {values.amComing === 'no' &&
                                <div>
                                    <Animated
                                        style={{marginBottom: "1.5em"}}
                                        animationIn="fadeIn"
                                        animationOut="fadeOut"
                                        isVisible={values.amComing === 'no'}>
                                        <div style={{fontSize: "1.5rem", textAlign: 'center'}}>We are very sorry that
                                            you
                                            are not coming
                                        </div>
                                        <div style={{fontSize: "1rem", textAlign: 'center'}}>But if you will change your
                                            mind pleas contact to us
                                        </div>
                                    </Animated>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut"
                                              animationInDelay={200}
                                              isVisible={values.amComing === 'no'}>
                                        <FormControl
                                            className={style.foolWidthField}>
                                            <Field
                                                component={TextField}
                                                name="extraInfo"
                                                rows={4}
                                                variant="outlined"
                                                multiline
                                                helperText="If you want to say something feel free to do it"
                                                placeholder={'If you want to say something feel free to do it'}
                                            />
                                        </FormControl>
                                    </Animated>
                                </div>
                                }
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button variant="contained" type={'submit'}
                                            color={'primary'}
                                            style={{
                                                // background: '#274d4e',
                                                // color: "white",
                                                width: "50%"
                                            }}>{t`submit`}</Button>

                                </Grid>
                            </Form>
                        </ThemeProvider>
                    )}
                </Formik>
            </Modal>
        </>
    );
}

export default FormModal;
