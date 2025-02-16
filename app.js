const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const _fetchQuoteFromAPI = require('./utils');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const QuoteSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    quote: { type: String, required: true },
    author: { type: String, required: true }
});
const Quote = mongoose.model('Quote', QuoteSchema);
// {"id":97,"quote":"The only place where your dream becomes impossible is in your own thinking.","author":"Robert H. Schuller"}%

// Daily Quote Fetcher from Rapid-API
app.get('/get-daily-quote', async (req, res) => {

    try {
        const quote = await _fetchQuoteFromAPI();
        // Add Quote to Mongo-DB
        const new_quote = await Quote.create({
            id: quote['id'],
            quote: quote['quote'],
            author: quote['author']
        });
        console.log("Quote added:", new_quote);
        res.json(quote);
    } catch (error) {
        console.error('Error fetching daily quote:', error);
        res.status(500).json({ error: 'Failed to fetch daily quote' });
    }

});

app.listen(
    5000, () => console.log('Server running on port 5000')
);