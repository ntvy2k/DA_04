import React, { useEffect, useState } from "react";
import HomeLayout from "../../../../components/Layouts/homeLayout";
import ProfileLayout from "../../../../components/Layouts/profileLayout";
import UserLayout from "../../../../components/Layouts/userLayout";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../components/CustomFields/InputField";
import userApi from "../../../api/userApi";
import { useRouter } from "next/router";
import styles from "../../../../styles/ChangeProfile.module.css";
import { Toast, ToastContainer } from "react-bootstrap";
import Head from "next/head";
import TD4_SETTINGS from "../../../../app/config";

function ChangeProfile() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });
  useEffect(() => {
    const fetch = async () => {
      const res = await userApi.getProfile({
        headers: { Authorization: `Token ${localStorage.getItem("key")}` },
      });
      const { id, ...newValue } = res.data;
      setInitialValues(newValue);
    };
    fetch();
  }, []);
  const validationSchema = Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string(),
    username: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("This field must be valid email")
      .required("This field must be required"),
  });
  return (
    <>
      <Head>
        <title>Chỉnh sửa thông tin | {TD4_SETTINGS.title}</title>
      </Head>
      <HomeLayout>
        <UserLayout>
          <ProfileLayout>
            <div className={styles.container}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  if (values !== initialValues) {
                    userApi.updateProfile(values, {
                      headers: {
                        Authorization: `Token ${localStorage.getItem("key")}`,
                      },
                    });
                    router.push("/user/profile/");
                  }
                }}
              >
                {(formiksProps) => {
                  return (
                    <Form>
                      <FastField
                        name="first_name"
                        component={InputField}
                        type="text"
                        label="Tên"
                        placeholder="Nhập..."
                      />
                      <FastField
                        name="last_name"
                        component={InputField}
                        type="text"
                        label="Họ"
                        placeholder="Nhập..."
                      />
                      <FastField
                        name="email"
                        component={InputField}
                        type="text"
                        label="Email"
                        placeholder="Nhập..."
                      />
                      <FastField
                        name="username"
                        component={InputField}
                        type="text"
                        label="Tên đăng nhập"
                        readonly={true}
                      />
                      <button type="submit" className={styles.button}>
                        Cập nhât thông tin
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

export default ChangeProfile;
