import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_POST } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_POST } from "../utils/queries";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const UpdatePost = () => {

    const { postId } = useParams();
    console.log(postId)

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: postId },
    });

    const post = data?.post || {};

    const [formState, setFormState] = useState({
        postTitle: post.postTitle,
        postText: post.postText
    });
    const [updatePost, { error, data1 }] = useMutation(UPDATE_POST);

    const [handleShow, setHandleShow] = useState(true);

    const handleClose = () => {
        setHandleShow(false);
        window.location.assign('/');
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updatePost({
                variables: { updatePostId: postId, postTitle: formState.postTitle, postText: formState.postText }
            });
            window.location.assign('/');
        } catch (e) {
            console.error(e);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            <Modal show={handleShow} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='postTitle'
                                onChange={handleChange}
                                autoFocus
                                value={formState.postTitle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='postText'
                                onChange={handleChange}
                                value={formState.postText} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdatePost;
