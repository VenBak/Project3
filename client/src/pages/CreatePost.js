import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";
import { findStockSymbol } from "../utils/stocksymbol";

import Auth from "../utils/auth";

const CreatePost = () => {
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
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

        if (Auth.loggedIn()) {
            try {
                const { data } = await createPost({
                    variables: { ...formState, postAuthor: Auth.getProfile().data.username },
                });
                console.log(data)
            } catch (e) {
                console.error(e);
            }
        } else {
            alert("Please log in to create a post");
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
                                    value={formState.postTitle}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your post text"
                                    name="postText"
                                    type="text"
                                    value={formState.postText}
                                    onChange={handleChange}
                                />
                                <div id="start">
                                    <p>Enter the name of a company to find its stock symbol:</p>
                                        <label htmlFor="company">Company:</label>
                                        <input type="text" id="companyName" name="company" />
                                        <label htmlFor="duration">Select period:</label>
                                        <select id="duration" name="duration">
                                        <option value="1min">1 min</option>
                                        <option value="1day">1 day</option>
                                        <option value="1week">1 week</option>
                                        <option value="1month">1 month</option>
                                        </select>
                                        <button type="button" onClick={findStockSymbol}>
                                        Search
                                        </button>
                                    <div id="results"></div>
                                    <ul id="stockSymbols"></ul>
                                </div>

                            <div id="results"></div>
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
