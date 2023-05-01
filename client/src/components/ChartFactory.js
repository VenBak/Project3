import React from "react";
import { Chart } from "chart.js/auto";
import { searchSymbolDuration } from "../utils/stockSymbolSearch";

const ChartFactory = (props) => {
    let symbol = props.symbol;
    let duration = props.duration;
    try {
        let data = searchSymbolDuration(symbol, duration);
        data.then(function (result) {
            let times = result[0];
            let values = result[1]
            // Calculate the 20-period moving average
            const movingAveragePeriod = 20;
            const movingAverageValues = [];
            for (let i = 0; i < values.length; i++) {
                if (i < movingAveragePeriod - 1) {
                    movingAverageValues.push(null);
                } else {
                    const sum = values.slice(i - movingAveragePeriod + 1, i + 1).reduce((acc, val) => acc + val, 0);
                    movingAverageValues.push(sum / movingAveragePeriod);
                }
            }

            const ctx = document.getElementById("myChart").getContext("2d");
            const chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: times,
                    datasets: [
                        {
                            label: "Price",
                            data: values,
                            fill: false,
                            borderColor: "rgba(0, 0, 255, 1)",
                            borderWidth: 1
                        },
                        {
                            label: "20-Day Moving Average",
                            data: movingAverageValues,
                            fill: false,
                            borderColor: "rgba(255, 0, 0, 1)",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: [
                            {
                                type: "time",
                                time: {
                                    displayFormats: {
                                        minute: "h:mm a"
                                    }
                                },
                                max: times[99]
                            }
                        ],
                        y: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
            chart.canvas.parentNode.style.overflow = "hidden";
        });
    } catch (e) {
        console.error(e);
    }

    return (
        <div>
        </div>
    )
}


export default ChartFactory;



