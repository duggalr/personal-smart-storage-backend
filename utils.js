require('dotenv').config();

const _fetchQuoteFromAPI = async () => {

    const { RAPID_API_QUOTE_BASE, RAPID_API_KEY, RAPID_API_QUOTE_HOST } = process.env;
    if (!RAPID_API_KEY || !RAPID_API_QUOTE_BASE || !RAPID_API_QUOTE_HOST) {
        throw new Error('Missing required environment variables: RAPID_API_QUOTE_BASE, RAPID_API_KEY, or RAPID_API_QUOTE_HOST');
    }

    try {
        const quoteResponse = await fetch(
            process.env.RAPID_API_QUOTE_BASE,
            {
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": process.env.RAPID_API_QUOTE_HOST
                }
            }
        );

        if (!quoteResponse.ok) {
            const errorText = quoteResponse.text();
            throw new Error(`API Error: ${quoteResponse.status}: ${errorText}`);
        }

        const data = quoteResponse.json()
        return data;
    } 
    catch (error) {
        throw new Error(`Error fetching quote from API: ${error}`);
    }

};

module.exports = _fetchQuoteFromAPI;