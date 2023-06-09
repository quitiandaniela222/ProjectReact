import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { format } from "date-fns";

const CryptoCurrency = ({ data, selectedCrypto }) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${selectedCrypto.id}/market_chart?vs_currency=usd&days=30`
                );
                const responseData = await response.json();

                const startDate = new Date(responseData.prices[0][0]);
                const dates = responseData.prices
                    .slice(0, 50)
                    .map((price, index) => {
                        const date = new Date(price[0]);
                        const weekNumber = Math.floor(index / 7) + 1;
                        return `w${weekNumber}`;
                    });
                const prices = responseData.prices.slice(0, 50).map((price) => price[1]);

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

        if (data && selectedCrypto) {
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
                                display: true,
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
                    <div style={{ width: "84%", height: "100%" }}>
                <div style={{ textAlign: "right" }}>
                    <h3>{selectedCrypto.name}</h3>
                </div>
                <div style={{ position: "relative" }}>
                    {chartData ? <canvas ref={chartRef}></canvas> : <p>Loading Data...</p>}
                    <div style={{ position: "absolute", bottom: 20, right: -90 }}>
    <p style={{ fontSize: "150%", color: "gray" }}>{selectedCrypto.current_price}</p>
</div>
                </div>
            </div>
        
    );
};

export default CryptoCurrency;
