import { FieldProps } from 'formik';
import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

interface userName {
    type: string,
    label: string,
    placeholder: string,
}

function InputField(props: FieldProps & userName) {
    const {
        field, form,
        type, label, placeholder
    } = props
    const { name } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]
    return (
        <div>
            <Form.Group controlId={name}>
                {label && <Form.Label >{label}</Form.Label>}
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    isInvalid={touched[name] && !!errors[name]}
                    {...field}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
                {/* {showError && <Form.Control.Feedback>{errors[name]}</Form.Control.Feedback>} */}
            </Form.Group>

        </div>
    );
}

export default InputField;