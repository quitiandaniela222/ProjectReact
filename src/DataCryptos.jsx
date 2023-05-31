import React, { useState, useEffect } from 'react';
import { datesCrypto } from './Helper';
import './DataCryptos.css';

const DataCryptos = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await datesCrypto();
                setData(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="overallContainer">
            <div className="graphicsContainer">
                <div className="graphicsInitial">
                    <h1>SalesActivity</h1>
                    <p>Hola</p>
                </div>
                <div>Grapics</div>
                </div>


                <div className="containerBoard">
                    <div className="containerTitle">
                    <p>control panel</p>
                <input placeholder="Enter you search request..." />
                <div className="cryptoName">
                    <p>B2B DISTRIBUTION</p>
                    <p>Sales Deals</p>
                </div>
            </div>

            <div>
            <hr> className="liying"</hr>
                </div>
                <div className="cryptoContainer">
                    {data.map(crypto => (
                        <div key={crypto.name} className="cryptos">
                            <p>{crypto.symbol}</p>
                            <p className="card__title">{crypto.name}</p>
                            <img src={crypto.image} alt={crypto.name} className="card__image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataCryptos;
