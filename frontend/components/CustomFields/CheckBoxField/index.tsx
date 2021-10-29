import { Field, FieldProps } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';

interface checkboxProps {
    label: string,
    options: Array<any>
}

function CheckBoxField(props: FieldProps & checkboxProps) {
    const {
        field, form,
        label, options
    } = props
    const { name, value } = field
    const { touched, errors } = form
    const showError = errors[name] && touched[name]

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <div className='row'>
                {options.map(option => {
                    return (
                        <Form.Check
                            key={option.value}
                            type='checkbox'
                            id={option.value}
                            label={option.name}
                            {...field}
                            value={option.value}
                            checked={value.includes(option.value.toString())}
                            isInvalid={touched[name] && !!errors[name]}
                            className='col-4'
                        />
                    )
                })}
            </div>
            {showError && <p className='text-danger'>{errors[name]}</p>}
        </Form.Group>
    );
}

export default CheckBoxField;