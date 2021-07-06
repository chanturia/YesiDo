import React, {useState} from 'react';
import style from '/styles/Home.module.scss'
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
    MenuItem, Radio, ThemeProvider
} from '@material-ui/core';
import {RadioGroup, Select, TextField, CheckboxWithLabel} from 'formik-material-ui';
import {Animated} from "react-animated-css";
import axios from 'axios';


const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#274d4e',
        },
    },
});

function FormState1({nextForm}) {
    const {t} = useTranslation('common')
    let initialValues = {
        userCode: ''
    }

    const SignupSchema = Yup.object().shape({
        userCode: Yup.string()
            .min(6, 'Not enough character')
            .max(6, 'More characters that needed')
            .required('Required')
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        const {data} = await axios.post(
                            '/api/getUserByCode',
                            values)
                        console.log(data)
                        window.currentUser = data
                        nextForm()
                    } catch (error) {
                        console.log(error)
                    }
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
                                        name="userCode"
                                        type="text"
                                        label={t`Your Code`}
                                        helperText={t`The code that you get in message`}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </div>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button variant="contained" type={'submit'}
                                        color={'primary'}
                                        disabled={Object.keys(errors)?.length !== 0}
                                        style={{
                                            width: "50%"
                                        }}>{t`submit`}</Button>

                            </Grid>
                        </Form>
                    </ThemeProvider>
                )}
            </Formik>
        </>
    );
}

export default FormState1;
