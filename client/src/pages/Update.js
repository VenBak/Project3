import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Update = (props) => {
    const [formState, setFormState] = useState({
        username: Auth.getProfile().data.username,
        email: Auth.getProfile().data.email
    });
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);

    const [deleteUser, { error1, data1 }] = useMutation(DELETE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateUser({
                variables: { updateUserId: Auth.getProfile().data._id, username: formState.username, email: formState.email}
            });

            Auth.updateUser(data.updateUser.token);

        } catch (e) {
            console.error(e);
        }
    };

    
    const handleDelete = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await deleteUser({
                variables: { userId: Auth.getProfile().data._id}
            });

            Auth.deleteUser();
        }
        catch (e) {
            console.error(e);
    }

};

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Update Profile</h4>
                    <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={formState.username}
                                    onChange={handleChange}
                            />
                            <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="text"
                                    value={formState.email}
                                    onChange={handleChange}
                            />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                            </button>
                        </form>
                        <br />
                            <button
                            className="btn btn-block btn-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={handleDelete}
                                >
                                    
                                    Delete
                                </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Update;
