import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { searchSymbol } from "../utils/stockSymbolSearch";

import Auth from "../utils/auth";
import ButtonFactory from "../components/ButtonFactory";
import ChartFactory from "../components/ChartFactory";



const CreatePost = () => {


    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        chartSymbol: '',
        chartDuration: '1d'
    });


    const [createPost, { error, data }] = useMutation(CREATE_POST);

    const [showButtons, setShowButtons] = useState();

    const [showChart, setShowChart] = useState();

    const [buttonSymbol, setButtonSymbol] = useState([]);

    const [buttonName, setButtonName] = useState([]);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const stockData = searchSymbol(formState.chartSymbol);
            stockData.then((data) => {
                var stockSymbols = data.bestMatches;
                var stockSymbol = [];
                var stockName = [];

                for (var i = 0; i < stockSymbols.length; i++) {
                    stockSymbol.push(stockSymbols[i]["1. symbol"]);
                    stockName.push(stockSymbols[i]["2. name"]);
                }
                for (var i = 0; i < stockSymbol.length; i++) {
                    setButtonSymbol(buttonSymbol => [...buttonSymbol, stockSymbol[i]]);
                    setButtonName(buttonName => [...buttonName, stockName[i]]);
                }
            });
            setShowButtons(true);
        } catch (e) {
            console.error(e);
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        if (Auth.loggedIn()) {
            try {
                const { data } = await createPost({
                    variables: { ...formState },
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            alert("Please log in to create a post");
        }
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setFormState({
            ...formState,
            chartSymbol: event.target.value,
        });
        handleChart(event.target.value);
    }

    const handleChart = async (symbol) => {
        setShowChart(true);
    }


    return (
        <main className="flex-row justify-center mb-4">
            <div className="postcard col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Create Post</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{" "}
                                <Link to="/home">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="postTitle">Post Title:</label>
                                <input
                                    placeholder={formState.postTitle}
                                    name="postTitle"
                                    type="postTitle"
                                    id="postTitle"
                                    onChange={handleChange}
                                />
                                <label htmlFor="postText">Post Text:</label>
                                <input
                                    placeholder={formState.postText}
                                    name="postText"
                                    type="postText"
                                    id="postText"
                                    onChange={handleChange}
                                />
                                <label htmlFor="chartSymbol">Stock Symbol:</label>
                                <input
                                    placeholder={formState.chartSymbol}
                                    name="chartSymbol"
                                    type="chartSymbol"
                                    id="chartSymbol"
                                    onChange={handleChange}
                                />
                                <select name="chartDuration" id="postDuration" defaultValue={"1d"} onChange={handleChange}>
                                    <option value="1m">1 Minute</option>
                                    <option value="1d" >1 Day</option>
                                    <option value="1wk">1 Week</option>
                                    <option value="1mo">1 Month</option>
                                </select>
                                <br></br>
                                <button className="btn btn-block btn-primary" style={{ cursor: "pointer" }} onClick={handleSearch}>Search</button>
                                <br></br>
                                {showButtons ? (
                                    <div id="buttonContainer">
                                        {buttonSymbol.map((symbol, index) => (
                                            <ButtonFactory symbol={symbol} name={buttonName[index]} onClick={handleButtonClick} />
                                        ))}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <br></br>
                                {showChart ? (
                                    <div>
                                        <canvas id="myChart" width="400" height="200"></canvas>
                                        <ChartFactory symbol={formState.chartSymbol} duration={formState.chartDuration} />
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: "pointer" }}
                                    type="submit"
                                    onClick={handleFormSubmit}
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </main >
    );
};






export default CreatePost;

