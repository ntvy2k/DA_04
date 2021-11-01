import { FastField, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetch_user, login } from '../features/auth';
import InputField from '../components/CustomFields/InputField';
import SearchLayout from '../components/Layouts/searchLayout';
import styles from "../styles/login.module.css"
import LoginImage from "../public/LoginColored.json"
import Lottie from 'react-lottie';
import { motion } from 'framer-motion'
import Link from 'next/link'

const loginOptions = {
  loop: true,
  autoplay: true,
  animationData: LoginImage,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const imageVariants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      type: 'spring'
    }
  }
}

const inputTextvariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
  }
}

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
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  })

  return (
    <SearchLayout>
      <Container className={styles.section}>
        <div className="row align-items-center">
          <motion.div
            className="col col-md-6"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Lottie options={loginOptions} height={400} width={400}></Lottie>
          </motion.div>
          <div className="col col-md-6">
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
                    <motion.div
                      variants={inputTextvariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1, type: 'spring' }}
                    >
                      <FastField
                        name="username"
                        component={InputField}

                        type="text"
                        label="Tên đăng nhập"
                        placeholder="Username..."
                      />
                    </motion.div>
                    <motion.div
                      variants={inputTextvariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.2, type: 'spring' }}
                    >
                      <FastField
                        name="password"
                        component={InputField}

                        type="password"
                        label="Mật khẩu"
                        placeholder="Passwd..."
                      />
                      <p>Chưa có tài khoản? <Link href="/register">Đăng ký</Link></p>
                    </motion.div>
                    <motion.button
                      type='submit'
                      className={styles.button}
                      variants={inputTextvariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.4, type: 'spring' }}
                    >Đăng nhập</motion.button>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Container>
    </SearchLayout>
  );
}

export default LoginForm;