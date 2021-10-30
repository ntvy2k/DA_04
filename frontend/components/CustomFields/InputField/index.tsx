import { FieldProps } from 'formik';
import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import styles from '../../../styles/InputField.module.css'

interface userName {
    type: string,
    label: string,
    placeholder: string,
    readonly?: boolean,
}

function InputField(props: FieldProps & userName) {
    const {
        field, form,
        type, label, placeholder, readonly
    } = props
    const { name } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]
    return (
        <div >
            <Form.Group controlId={name} className='mt-4'>
                {label && <Form.Label >{label}</Form.Label>}
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    isInvalid={touched[name] && !!errors[name]}
                    className={styles.input}
                    readOnly={readonly}
                    {...field}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
                {/* {showError && <Form.Control.Feedback>{errors[name]}</Form.Control.Feedback>} */}
            </Form.Group>

        </div>
    );
}

export default InputField;