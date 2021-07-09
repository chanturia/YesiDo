import React, {useContext} from 'react';
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
import {Context} from "/store/Store";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#274d4e',
        },
    },
});

function FormState2() {
    const {t} = useTranslation('common')
    const [state, dispatch] = useContext(Context);

    const getAllowedAmount = (number) => {
        number = parseInt(number)
        let result = [<MenuItem key={1} value={1}>{t`Only Me`}</MenuItem>]
        for (let i = 2; i <= number; i++) {
            result.push(<MenuItem key={i} value={i}>{t(`${i} persons`)}</MenuItem>)
        }
        return result
    }

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
        needHelpWithTransfer: Yup.boolean(),
        extraInfo: Yup.string(),

    });

    return (
        <>
            <Formik
                initialValues={{
                    firstAndLastName: state.currentUser.firstAndLastName,
                    userCode: state.currentUser.userCode,
                    amount: 1,
                    amComing: '',
                    needHelpWithTransfer: false
                }
                }
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    if (values.amComing === "no") {
                        values.amount = 0
                    }
                    const {data} = await axios.post(
                        '/api/saveFormData',
                        values)
                    dispatch({type: 'SET_CURRENT_USER', payload: {...state.currentUser, ...data}})
                }}
            >
                {({values, errors, touched, setFieldValue}) => (
                    <ThemeProvider theme={theme}>
                        <Form onChange={() => {
                            if (values.amComing === "no") {
                                setFieldValue('needHelpWithTransfer', false)
                            }
                            if (values.amComing === "yes") {
                                setFieldValue('extraInfo', '')
                            }
                        }}>
                            <div>
                                <FormControl className={style.foolWidthField} style={{marginTop: 0}}>
                                    <Field
                                        disabled={values.firstAndLastName?.length > 0}
                                        required
                                        component={TextField}
                                        name="firstAndLastName"
                                        type="text"
                                        label={t`First and last name`}
                                        helperText={t`First and last name of a main person`}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={style.foolWidthField}
                                             component="fieldset"
                                             required
                                             error={errors.amComing && touched.amComing}>
                                    <FormLabel component="legend">{t`Are you coming`}</FormLabel>
                                    <Field component={RadioGroup} name="amComing">
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio color="primary"/>}
                                            label={t`Yes i am coming`}
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio color="primary"/>}
                                            label={t`Unfortunately i can not`}
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
                                            <InputLabel>{t`Persons`}</InputLabel>
                                            <Field
                                                component={Select}
                                                name="amount"
                                            >
                                                {getAllowedAmount(state.currentUser.allowedAmount)}
                                            </Field>
                                            <FormHelperText>{t`Persons that are coming with you`}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Animated>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={200}
                                          isVisible={values.amComing === 'yes'}>
                                    <FormControl className={style.foolWidthField}><Field
                                        color="primary"
                                        component={CheckboxWithLabel}
                                        type="checkbox"
                                        name="needHelpWithTransfer"
                                        indeterminate={false}
                                        Label={{label: t`I need help with transfer`}}
                                    />
                                        <FormHelperText>{t`helpText`}</FormHelperText>
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
                                    <div style={{fontSize: "1.5rem", textAlign: 'center'}}>{t`weAreSorryText`}</div>
                                    <div style={{
                                        fontSize: "1rem",
                                        textAlign: 'center'
                                    }}>{t`ifYouChangeYourMind`}</div>
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
                                            placeholder={t`If you want to say something feel free to do it`}
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

export default FormState2;
