export const datesCrypto = async () => {
    const apiUrl =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

    try {
        const databaseCrypto = await fetch(apiUrl, { method: 'GET' });
        const jsonDataCrypto = await databaseCrypto.json();
        const results = jsonDataCrypto;

        const newArrayCryptos = results.map((result) => {
            return {
                id: result.id,
                symbol: result.symbol,
                name: result.name,
                image: result.image,
                current_price: result.current_price,
                price_change_percentage: result.price_change_percentage,
            };
        });
        return newArrayCryptos;
    } catch (error) {
        console.error(error);
    }
};

datesCrypto();
