import React, { useEffect, useState } from "react";
import HomeLayout from "../../../components/Layouts/homeLayout";
import exerciseApi from "../../api/exerciseApi";
import styles from "../../../styles/Exercise.module.css";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../components/CustomFields/InputField";
import SelectField from "../../../components/CustomFields/SelectField";
import CheckBoxField from "../../../components/CustomFields/CheckBoxField";
import {
  CloudArrowUp,
  NodePlus,
  Pencil,
  PlusSquare,
  QuestionSquare,
} from "react-bootstrap-icons";
import Link from "next/link";
import * as Yup from "yup";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  Toast,
  ToastContainer,
} from "react-bootstrap";

import Head from "next/head";
import TD4_SETTINGS from "../../../app/config";

function Question() {
  const [show, setShow] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [config, setConfig] = useState<any>();
  const [exercises, setExercises] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const [idEdit, setIdEdit] = useState<any>();

  const initialValues = {
    name: "",
    co_creator: [],
  };
  const [initialValueEdit, setInitialValueEdit] = useState<any>({
    name: "",
    co_creator: [],
  });

  const validateShema = Yup.object().shape({
    name: Yup.string().required("Bạn phải nhập tên"),
  });

  useEffect(() => {
    setConfig({
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    });
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await exerciseApi.getExercise(config);
      const resUser = await exerciseApi.getUser(config);
      const arrayUser = resUser.data.map(
        ({ id, username }: { id: any; username: any }) => {
          return {
            name: username,
            value: id,
          };
        }
      );
      setExercises(res.data);
      setUser(arrayUser);
    };
    config && fetch();
  }, [config]);
  const handleEditExercise = (exercise: any) => {
    setIdEdit(exercise.id);
    setInitialValueEdit({
      name: exercise.name,
      co_creator: exercise.co_creator.map((e: any) => e.toString()),
    });
    handleShow();
  };
  const handlePublishExercise = async (id: any) => {
    await exerciseApi.pulishExercise(id, config).then(() => setShowMess(true));
  };
  return (
    <>
      <Head>
        <title>Bài tập | {TD4_SETTINGS.title}</title>
      </Head>
      <HomeLayout>
        <div className={`container ${styles.wrapper}`}>
          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowMess(false)}
              bg="success"
              show={showMess}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Thông báo</strong>
              </Toast.Header>
              <Toast.Body>Publish thành công</Toast.Body>
            </Toast>
          </ToastContainer>
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="bg-success" closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Sửa câu hỏi
              </Modal.Title>
            </Modal.Header>
            <Formik
              enableReinitialize
              initialValues={initialValueEdit}
              validationSchema={validateShema}
              onSubmit={async (value) => {
                exerciseApi.updateExercise(value, idEdit, config);
                const res = await exerciseApi.getExercise(config);
                setExercises(res.data);
                handleClose();
              }}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Modal.Body className="bg-secondary border-0">
                      <FastField
                        name="name"
                        component={InputField}
                        type="text"
                        label="Tên câu hỏi"
                        placeholder="Nhập..."
                      />
                      {user.length !== 0 && (
                        <FastField
                          name="co_creator"
                          component={CheckBoxField}
                          label="Chọn mấy thằng làm chung"
                          options={user}
                        />
                      )}
                    </Modal.Body>
                    <Modal.Footer className="bg-success border-0">
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button type="submit" variant="primary">
                        Lưu thay đổi
                      </Button>
                    </Modal.Footer>
                  </Form>
                );
              }}
            </Formik>
          </Modal>
          <div className="row">
            <div className="col">
              <h3 className={styles.title}>
                <NodePlus className={`${styles.iconTitle} ${styles.iconAdd}`} />
                Thêm mới bài tập
              </h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validateShema}
                onSubmit={async (value, { resetForm }) => {
                  exerciseApi.postExercise(value, config);
                  const res = await exerciseApi.getExercise(config);
                  setExercises(res.data);
                  resetForm();
                }}
              >
                {(formikProps) => {
                  return (
                    <Form>
                      <FastField
                        name="name"
                        component={InputField}
                        type="text"
                        label="Tên câu hỏi :"
                        placeholder="Nhập..."
                      />
                      {user.length !== 0 && (
                        <FastField
                          name="co_creator"
                          component={CheckBoxField}
                          label="Chọn mấy thằng làm chung :"
                          options={user}
                        />
                      )}
                      <button type="submit" className={styles.button}>
                        Thêm bài tập
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className="col">
              <h3 className={styles.title}>
                <QuestionSquare
                  className={`${styles.iconTitle} ${styles.iconQuestion}`}
                />
                Bài tập của bạn
              </h3>
              <ul>
                {exercises &&
                  exercises.map((exercise: any) => {
                    return (
                      <li key={exercise.id} className={styles.question}>
                        <p className={styles.questionName}>{exercise.name}</p>
                        <div className={styles.questionModified}>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                Publish bài tập
                              </Tooltip>
                            }
                          >
                            <div
                              onClick={() => handlePublishExercise(exercise.id)}
                            >
                              <CloudArrowUp
                                className={styles.questionModifiedIcon}
                              />
                            </div>
                          </OverlayTrigger>
                          <Link href={`/user/exercise/${exercise.id}/`}>
                            <a>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    Thêm câu hỏi
                                  </Tooltip>
                                }
                              >
                                <PlusSquare
                                  className={styles.questionModifiedIcon}
                                />
                              </OverlayTrigger>
                            </a>
                          </Link>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                Chỉnh sửa bài tập
                              </Tooltip>
                            }
                          >
                            <div onClick={() => handleEditExercise(exercise)}>
                              <Pencil className={styles.questionModifiedIcon} />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default Question;
