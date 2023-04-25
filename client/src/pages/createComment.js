import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Auth from '../utils/auth';

const CreateComment = () => {
    const [formState, setFormState] = useState({ commentText: '' });
    const [createComment, { error, data }] = useMutation(CREATE_COMMENT);

    const [handleShow, setHandleShow] = useState(true);

    const handleClose = () => {
        setHandleShow(false);
        window.location.assign('/');
    }

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            commentText: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await createComment({
                variables: { ...formState },
            });

            Auth.login(data.createComment.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            commentText: '',
        });
    };

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Create Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comment Text</Form.Label>
                            <Form.Control as="textarea" rows={3} name="commentText" onChange={handleChange} value={formState.commentText} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateComment;