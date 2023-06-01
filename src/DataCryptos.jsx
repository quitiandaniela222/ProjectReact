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
    const dataSearch = (event) => {
        setSearchValue (event.target.value) ;
        };
        const filteredCryptoData = cryptoData?. filter ((crypto) =>{
        const { name, symbol } = crypto;
        const searchTerm = searchValue. toLowerCase();
        );
}


    return (
        <div className="overallContainer">
            <div className="graphicsContainer">
                <div className="graphicsInitial">
                    <h1>grapich</h1>
                    <p>grapich</p>
                </div>
                <div>Grapics</div>
            </div>

            <div className="containerBoard">
                <div className="containerTitle">
                    <p>Control panel</p>
                    <input placeholder="Enter your search request..." />
                    <div className="cryptoName">
                        <p>B2B DISTRIBUTION</p>
                        <p>Sales Deals</p>
                    </div>
                </div>

                <hr className="lying" />

                <div className="cryptoContainer">
                    {data.map(crypto => (
                        <div key={crypto.name} className="cryptos">
                            <img src={crypto.image} alt={crypto.name} />
                            <div className="symbolYName">
                                <p>{crypto.name}</p>
                                <p>{crypto.symbol}</p>
                            </div>
                            <p>{crypto.current_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



    export default DataCryptos;
