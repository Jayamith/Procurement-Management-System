import { Form, Alert } from 'react-bootstrap';
import React from 'react'

export default function InputField(props) {
    const { FormLabel, name, value, handleChange, FormText, error, type, placeholder, trap } = props
    return (

        <Form.Group controlId="aa" >
            <Form.Label>{FormLabel}</Form.Label>
            <Form.Control onChange={handleChange} name={name} value={value} placeholder={placeholder} type={type} disabled={trap} data-testid="editor" />
            <Form.Text className="text-muted">
                {FormText}
            </Form.Text>
            {error && <Alert variant="danger" >
                <Alert.Heading style={{ fontSize: "15px" }}>
                    {error}
                </Alert.Heading>
            </Alert>}
        </Form.Group>
    );
}

