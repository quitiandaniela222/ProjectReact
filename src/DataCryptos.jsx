import React, { useState, useEffect } from 'react';
import { datesCrypto } from './Helper';
import './DataCryptos.css';
import CryptoCurrency from './CryptocurrencyChart';
import {searchApi} from './SearchAPI';

const DataCryptos = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [chooseCrypto, setChooseCrypto] = useState([]);

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const jsonData = await datesCrypto();
                setData(jsonData);
                if (jsonData.length > 0) {
                    setChooseCrypto(jsonData[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (data.length === 0) {
            fetchCrypto();
        }
    }, [data]);

    const handleCryptoSelect = (crypto) => {
        setChooseCrypto(crypto);
    };

    const fetchData = async () => {
        if (searchQuery !== '') {
            try {
                const dataSearchCrypto = await searchApi(searchQuery);
                setData(dataSearchCrypto)
        
            } catch (error) {
                console.error(error);
            }
        } else {
            const jsonData = await datesCrypto();
            setData(jsonData);
        }
    };


    useEffect(() => {
        
        fetchData();
    }, []);

    const filteredData = data?.filter((crypto) => {
        return crypto.name.toLowerCase().includes(searchQuery) || crypto.symbol.toLowerCase().includes(searchQuery);
    });
console.log("data=" + data);

    return (
        <div className="body">
            <div className="overallContainer">
                <div className="graphicsContainer">
                    <div className="graphicsInitial">
                        <h1 style={{ fontWeight: '400' }}>Sales Activity</h1>
                        <p style={{ fontSize: '20px', color: '#656565' }}>
                            Here you can compare sales channel to determine the most effective
                        </p>
                        <p style={{ fontSize: '20px', color: '#656565' }}>
                            channels and develop a sales strategy based on this data.
                        </p>
                        <div>
                            <CryptoCurrency data={filteredData} selectedCrypto={chooseCrypto} />
                        </div>
                    </div>
                </div>

                <div className="containerBoard">
                    <div className="containerTitle">
                        <p>Control panel</p>
                        <input placeholder="Enter your search request..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                        <div className="cryptoName">
                            <h1 style={{ fontSize: '15px' }}> B2B DISTRIBUTION</h1>
                            <p style={{ fontSize: '12px' }}>Sales Deals</p>
                        </div>
                    </div>

                    <hr className="lying" />
                    <div className="cryptoContainer">
                        {filteredData.map((crypto) => (
                            <div key={crypto.name} className="cryptos" onClick={() => handleCryptoSelect(crypto)}>
                                <img src={crypto.image} alt={crypto.name} />
                                <div className="symbolYName">
                                    <p>{crypto.name}</p>
                                    <p>{crypto.symbol}</p>
                                </div>
                                <div className="price">
                                    <p>{crypto.current_price.toFixed(2).replace('.',',')} USD</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataCryptos;
