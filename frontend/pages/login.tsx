import { FastField, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetch_user, login } from '../features/auth';
import InputField from '../components/CustomFields/InputField';

function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );
  const initialValues = {
    username: '',
    password: '',
  }
  useEffect(() => {
    if (is_authenticated && localStorage.getItem("key") !== null) {
      router.push("/");
    }
  }, [is_authenticated, router]);

  useEffect(() => {
    const token = localStorage.getItem("key");
    if (token !== null) {
      dispatch(fetch_user(token))
        .unwrap()
        .then(() => router.push("/"));
    }
  }, [dispatch, router]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required').
      matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ username, password }) => {
        console.log(username, password)
        login(username, password)
          .then((response) => {
            localStorage.setItem("key", response.data.access);
            router.push("/");
          })
          .catch((e) => console.log(e));
      }}
    >
      {formikProps => {
        const { values, errors, touched } = formikProps
        return (
          <Form>
            <FastField
              name="username"
              component={InputField}

              type="text"
              label="Username"
              placeholder="Username..."
            />
            <FastField
              name="password"
              component={InputField}

              type="password"
              label="PassWord"
              placeholder="Passwd..."
            />
            <Button type='submit'>Submit</Button>
          </Form>
        )
      }}
    </Formik>
  );
}

export default LoginForm;