export const searchApi = async (searchQuery) => {
    const searchUrl =
    `https://api.coingecko.com/api/v3/search?query=${searchQuery}`;

    try {
        const dataSearchCrypto = await fetch(searchUrl);
        const jsonSearchCrypto = await dataSearchCrypto.json();
        const searchData = jsonSearchCrypto.map((result) => ({
            name: result.name,
            symbol: result.symbol,
            image: result.image,
            current_price: result.current_price,
        }));
        return searchData;
    } catch (error) {
        return error;
    }
};


