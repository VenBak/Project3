import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import Auth from "../utils/auth";

const CreatePost = () => {
    const [formState, setFormState] = useState({
        postText: "",
        postTitle: "",
    });
    const [createPost, { error, data }] = useMutation(CREATE_POST);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createPost({
                variables: { ...formState },
            });

            Auth.login(data.createPost.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Create Post</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{" "}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your post title"
                                    name="postTitle"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your post text"
                                    name="postText"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn d-block w-100"
                                    style={{ cursor: "pointer" }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreatePost;
