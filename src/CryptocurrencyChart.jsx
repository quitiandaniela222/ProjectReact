import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CryptoCurrency = ({ data, selectedCrypto }) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (data && selectedCrypto) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}/market_chart?vs_currency=usd&days=30`
                    );
                    const responseData = await response.json();

                    const dates = [];
                    const prices = [];

                    const startDate = new Date(responseData.prices[0][0]);
                    for (let i = 0; i < 50; i++) {
                        const date = new Date(startDate);
                        dates.push(date.toLocaleDateString());
                        prices.push(responseData.prices[i][1]);
                    }

                    const formattedData = {
                        labels: dates,
                        datasets: [
                            {
                                label: `${selectedCrypto.name} Price (USD)`,
                                data: prices,
                                backgroundColor: "rgba(192, 192, 192, 0.8)",
                                borderWidth: 2,
                                hoverBackgroundColor: "#C1EE0A",
                            },
                        ],
                    };

                    setChartData(formattedData);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [data, selectedCrypto]);

    useEffect(() => {
        if (chartData) {
            const ctx = chartRef.current.getContext("2d");

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: "bar",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            min: Math.min(...chartData.datasets[0].data),
                            max: Math.max(...chartData.datasets[0].data),
                            ticks: {
                                stepSize: 300,
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
    }, [chartData]);

    return (
        <div style={{ width: "84%", height: "320px" }}>
            {chartData ? <canvas ref={chartRef}></canvas> : <p>Loading Data...</p>}
        </div>
    );
};

export default CryptoCurrency;
