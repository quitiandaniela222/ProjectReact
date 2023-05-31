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
        <div>
            <div className="data-container">
                <div className="containerCryptos">
                    {data.map(crypto => (
                        <div className="crypto-item" key={crypto.id}>
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
