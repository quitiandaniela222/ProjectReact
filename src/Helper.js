export const datesCrypto = async () => {
    const apiUrl =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

    try {
        const databaseCrypto = await fetch(apiUrl, { method: 'GET' });
        const jsonDataCrypto = await databaseCrypto.json();

        return jsonDataCrypto;
    } catch (error) {
        console.error(error);
    }
};

datesCrypto();
