import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CryptoCurrency = () => {
    const [data, setData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
                );
                const responseData = await response.json();

                const dates = [];
                const prices = [];

                const startDate = new Date(responseData.prices[0][0]);
                for (let i = 0; i < 30; i++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + i);
                    dates.push(date.toLocaleDateString());
                    prices.push(responseData.prices[i][1]);
                }

                const formattedData = {
                    labels: dates,
                    datasets: [
                        {
                            label: "Bitcoin Price (USD)",
                            data: prices,
                            backgroundColor: "rgba(192, 192, 192, 0.8)",
                            borderWidth: 2,
                            hoverBackgroundColor: "#C1EE0A",
                        },
                    ],
                };

                setData(formattedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            const ctx = chartRef.current.getContext("2d");

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: "bar",
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                font: {
                                    size: 12,
                                },
                            },
                            categoryPercentage: 1,
                            barPercentage: 0.8,
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            min: 28000,
                            max: 30000,
                            ticks: {
                                stepSize: 500,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [data]);

    return (
        <div style={{ width: "100%", height: "400px" }}>
            {data ? <canvas ref={chartRef}></canvas> : <p>Loading...</p>}
        </div>
    );
};

export default CryptoCurrency;
