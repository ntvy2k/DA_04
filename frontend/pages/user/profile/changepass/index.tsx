import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../../../../components/CustomFields/InputField";
import HomeLayout from "../../../../components/Layouts/homeLayout";
import ProfileLayout from "../../../../components/Layouts/profileLayout";
import UserLayout from "../../../../components/Layouts/userLayout";
import * as Yup from "yup";
import userApi from "../../../api/userApi";
import styles from "../../../../styles/ChangeProfile.module.css";
import { useRouter } from "next/router";
import { Toast, ToastContainer } from "react-bootstrap";
import Head from "next/head";
import TD4_SETTINGS from "../../../../app/config";

function ChangePass() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const initialValues = {
    current_password: "",
    new_password: "",
    confirmPass: "",
  };
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("This field is required"),
    new_password: Yup.string()
      .required("This field is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPass: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Passwords must match"
    ),
  });
  return (
    <>
      <Head>
        <title>Đổi mật khẩu | {TD4_SETTINGS.title}</title>
      </Head>
      <HomeLayout>
        <UserLayout>
          <ProfileLayout>
            <div className={styles.container}>
              <ToastContainer className="p-3" position="top-end">
                <Toast
                  show={show}
                  onClose={() => setShow(false)}
                  bg="danger"
                  delay={2000}
                  autohide
                >
                  <Toast.Header>
                    <strong className="me-auto">Error</strong>
                  </Toast.Header>
                  <Toast.Body>Username already exists</Toast.Body>
                </Toast>
              </ToastContainer>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async ({ confirmPass, ...values }) => {
                  await userApi
                    .changePass(values, {
                      headers: {
                        Authorization: `Token ${localStorage.getItem("key")}`,
                      },
                    })
                    .then((res) => {
                      // router.push('/user/profile')
                      // console.log(res);
                    })
                    .catch(() => setShow(true));
                }}
              >
                {(formiksProps) => {
                  return (
                    <Form>
                      <FastField
                        name="current_password"
                        component={InputField}
                        type="password"
                        label="Nhập mật khẩu cũ"
                        placeholder="Nhập..."
                      />
                      <FastField
                        name="new_password"
                        component={InputField}
                        type="password"
                        label="Nhập mật khẩu mới"
                        placeholder="Nhập..."
                      />
                      <FastField
                        name="confirmPass"
                        component={InputField}
                        type="password"
                        label="Xác nhận lại mật khẩu mới"
                        placeholder="Nhập..."
                      />
                      <button type="submit" className={styles.button}>
                        Đổi mật khẩu
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </ProfileLayout>
        </UserLayout>
      </HomeLayout>
    </>
  );
}

export default ChangePass;
