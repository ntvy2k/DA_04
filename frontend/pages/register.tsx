import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { register } from "../features/auth";
import type { RegisterForm } from "../features/auth";
import { FastField, Form, Formik } from "formik";
import InputField from "../components/CustomFields/InputField";
import { Button, Container, Toast, ToastContainer } from "react-bootstrap";
import * as Yup from 'yup'
import styles from "../styles/login.module.css"
import SearchLayout from "../components/Layouts/searchLayout";
import { motion } from 'framer-motion'
import Lottie from "react-lottie";
import RegisterImage from '../public/Register.json'

// Uncomplete... Lam di Phuc
// ../features/auth kiem tra nha

const initForm: RegisterForm = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: "",
};

const registerOptions = {
  loop: true,
  autoplay: true,
  animationData: RegisterImage,
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
    y: 0
  }
}

const RegForm = () => {
  const router = useRouter();
  const [show1, setShow1] = useState(false);
  const toggleShow1 = () => setShow1(false);
  const [show2, setShow2] = useState(false);
  const toggleShow2 = () => setShow2(false);
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('This field is required'),
    last_name: Yup.string().required('This field is required'),
    username: Yup.string().required('This field is required'),
    email: Yup.string().email('This field must be valid email').required('This field must be required'),
    password: Yup.string().required('This field must be required').
      matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  return (
    <SearchLayout>
      <Container className={`${styles.section}`}>
        <ToastContainer className="position-fixed p-3" position="top-end">
          <Toast show={show1} onClose={toggleShow1} bg="danger" delay={2000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Username already exists</Toast.Body>
          </Toast>
          <Toast show={show2} onClose={toggleShow2} bg="danger" delay={2000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Email already exists</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="row align-items-center">
          <motion.div
            className="col col-md-6"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Lottie options={registerOptions} height={400} width={400}></Lottie>
          </motion.div>
          <div className="col col-md-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={({ confirmPassword, ...newObject }) => {
                register(newObject)
                  .then((res) => {
                    const r = res.data;
                    if (r.status === 0) {
                      console.log("Register Successful");
                      router.push("/login");
                    } else if (r.status === 1) {
                      setShow1(true)
                    } else if (r.status === 2) {
                      setShow2(true)
                    }
                  })
                  .catch((err) => console.log("Error: Unknown...", err));
              }}
            >
              {formikProps => {
                return (
                  <Form>
                    <motion.div
                      variants={inputTextvariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1, type: 'spring' }}
                    >
                      <FastField
                        name="first_name"
                        component={InputField}

                        type="text"
                        label="FirstName"
                        placeholder="FirstName"
                      ></FastField>
                      <FastField
                        name="last_name"
                        component={InputField}

                        type="text"
                        label="LastName"
                        placeholder="LastName"
                      ></FastField>
                      <FastField
                        name="username"
                        component={InputField}

                        type="text"
                        label="UserName"
                        placeholder="UserName"
                      ></FastField>
                      <FastField
                        name="email"
                        component={InputField}

                        type="email"
                        label="Email"
                        placeholder="Email"
                      ></FastField>
                      <FastField
                        name="password"
                        component={InputField}

                        type="password"
                        label="Password"
                        placeholder="Password"
                      ></FastField>
                      <FastField
                        name="confirmPassword"
                        component={InputField}

                        type="password"
                        label="ConFirmPassword"
                        placeholder="ConFirmPassword"
                      ></FastField>
                      <button type='submit' className={styles.button}>Register</button>
                    </motion.div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Container>
    </SearchLayout >
  );
};

const Register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register an account" />
      </Head>
      <RegForm />
    </>
  );
};

export default Register;
