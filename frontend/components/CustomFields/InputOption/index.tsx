import { FieldProps } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import styles from '../../../styles/InputFieldQuiz.module.css'

interface userName {
    type: string,
    labelOption: string,
    labelExplain: string,
    placeholderOption: string,
    placeholderExplain: string,
    onDelete: Function,
    readonly?: boolean,
}

function InputOption(props: FieldProps & userName) {
    const {
        field, form,
        type, labelOption, labelExplain, placeholderOption, placeholderExplain, onDelete, readonly
    } = props
    const { name, value } = field
    const { errors, touched } = form
    const handleChange = (type: any, event: any) => {
        switch (type) {
            case 'is_right':
                {
                    value.is_right = event.target.checked
                    console.log(value)
                    break
                }
            case 'statement':
                {
                    value.statement = event.target.value
                    console.log(value)
                    break
                }
        }
    }

    return (
        <div className='d-flex align-items-center'>
            <Form.Check
                type='checkbox'
                {...field}
                value={value.is_right}
                onChange={(e) => handleChange('is_right', e)}
            />
            <div className={styles.option}>
                <p className={styles.optionName}>A</p>
                <Trash
                    className={styles.optionDelete}
                    onClick={() => onDelete(1)}
                />
            </div>
            <div className='flex-fill'>
                <Form.Group controlId={name} className={styles.text}>
                    {labelOption && <Form.Label className={styles.formLabel} >{labelOption}</Form.Label>}
                    <Form.Control
                        type={type}
                        placeholder={placeholderOption}
                        isInvalid={touched[name] && !!errors[name]}
                        className={styles.input}
                        readOnly={readonly}
                        {...field}
                        value={value.statement}
                        // onBlur={(e) => handleChange('statement', e)}
                        onChange={(e) => handleChange('statement', e)}
                    // onInput={(e) => handleChange('statement', e)}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={name} className={styles.text}>
                    {labelExplain && <Form.Label className={styles.formLabel} >{labelExplain}</Form.Label>}
                    <Form.Control
                        type={type}
                        placeholder={placeholderExplain}
                        isInvalid={touched[name] && !!errors[name]}
                        className={styles.input}
                        readOnly={readonly}
                        {...field}
                        value={value.explain}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
                </Form.Group>
            </div>
        </div>
    );
}

export default InputOption;