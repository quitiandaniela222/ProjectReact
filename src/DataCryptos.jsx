import React, { useState, useEffect } from 'react';
import { datesCrypto } from './Helper';
import './DataCryptos.css';


const DataCryptos = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const fetchCrypto = async () => {
        try {
            const jsonData = await datesCrypto();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };
    if (data.length === 0) {
        fetchCrypto();
        return null;
    }


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = data.filter((crypto) => {
        return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
    });


    return (
        <div className="body">
            <div className="overallContainer">
                <div className="graphicsContainer">
                    <div className="graphicsInitial">
                        <h1>Sales Activity</h1>
                        <p>Here you can compare sales channel to determine the most effective</p>
                        <p>channels and develop a sales strategy based on this data.</p>
                    </div>
                </div>


                <div className="containerBoard">
                    <div className="containerTitle">
                        <p>Control panel</p>
                        <input placeholder="Enter your search request..." value={searchQuery} onChange={handleSearch} />
                        <div className="cryptoName">
                            <h1 style={{ fontSize: "15px" }}> B2B DISTRIBUTION</h1>
                            <p style={{ fontSize: "9px" }}>Sales Deals</p>
                        </div>
                    </div>


                    <hr className="lying" />
                    <div className="cryptoContainer">
                        {filteredData.map(crypto => (
                            <div key={crypto.name} className="cryptos">
                                <img src={crypto.image}/>
                                <div className="symbolYName">
                                    <p>{crypto.name}</p>
                                    <p>{crypto.symbol}</p>
                                </div>
                                <div className="price">
                                    <p>{crypto.current_price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DataCryptos;
