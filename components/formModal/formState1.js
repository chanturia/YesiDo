import React, {useState, useContext} from 'react';
import style from '/styles/Home.module.scss'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation'
import {
    Button, createMuiTheme,
    FormControl, Grid,
    ThemeProvider
} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import {Animated} from "react-animated-css";
import axios from 'axios';
import {Context} from '/store/Store'

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#274d4e',
        },
    },
});

function FormState1() {
    const {t} = useTranslation('common')
    const [errorUserNotFound, setErrorUserNotFound] = useState(false)
    const [state, dispatch] = useContext(Context);

    const SignupSchema = Yup.object().shape({
        userCode: Yup.string()
            .min(6, t('6 characters'))
            .max(6, t('6 characters'))
            .required('Required')
    });

    return (
        <>
            <Formik
                initialValues={{
                    userCode: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        const {data} = await axios.post(
                            '/api/getUserByCode',
                            values)
                        dispatch({type: 'SET_CURRENT_USER', payload: data})
                        setErrorUserNotFound(false)
                    } catch ({response}) {
                        if (response.status === 404) {
                            setErrorUserNotFound(true)
                        }
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
                                        helperText={!errorUserNotFound ? t`The code that you get in message` : t`Wrong User code`}
                                        variant="outlined"
                                        error={Object.keys(errors)?.length !== 0 || errorUserNotFound}
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
