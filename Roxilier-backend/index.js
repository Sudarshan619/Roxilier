const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const fs = require("fs")
const path = require("path");
const cors = require("cors")

app.use(cors());

let transactions = [];

// Fetch data from the third-party API
const loadData = async () => {
    const dataPath = path.join(__dirname, 'data.json');
    const rawData = fs.readFileSync(dataPath);
    transactions = await  JSON.parse(rawData);

};

// Initialize the server and load data
app.listen(PORT, async () => {
    await loadData();
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', async(req,res)=>{
    res.json({transactions});
})

// List all transactions with search and pagination
app.get('/transactions', (req, res) => {
    const { page = 1, perPage = 10, search = '' , month = ''} = req.query;

    
   
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.title.toLowerCase().includes(search.toLowerCase()) ||
            transaction.description.toLowerCase().includes(search.toLowerCase()) ||
            transaction.price.toString().includes(search) ||
            transaction.sold.toString().includes(search);

        const matchesMonth = month === '' || new Date(transaction.dateOfSale).getMonth() + 1 === parseInt(month);

        return matchesSearch && matchesMonth;
    });

    const paginatedTransactions = filteredTransactions.slice((page - 1) * perPage, page * perPage);

    res.json({
        page: parseInt(page),
        perPage: parseInt(perPage),
        total: filteredTransactions.length,
        transactions: paginatedTransactions
    });
});

// Statistics for the selected month
app.get('/statistics', (req, res) => {
    const { month} = req.query;
  
    const filteredTransactions = transactions.filter(transaction => 
        new Date(transaction.dateOfSale).getMonth() + 1 === parseInt(month)
    );

    const totalSaleAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = filteredTransactions.length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
    });
});

// Bar chart data for the selected month
app.get('/bar-chart', (req, res) => {
    const { month } = req.query;
    console.log(month);

    const filteredTransactions = transactions.filter(transaction => 
        new Date(transaction.dateOfSale).getMonth() + 1 === parseInt(month)
    );

    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0
    };

    filteredTransactions.forEach(transaction => {
        if (transaction.price <= 100) priceRanges['0-100']++;
        else if (transaction.price <= 200) priceRanges['101-200']++;
        else if (transaction.price <= 300) priceRanges['201-300']++;
        else if (transaction.price <= 400) priceRanges['301-400']++;
        else if (transaction.price <= 500) priceRanges['401-500']++;
        else if (transaction.price <= 600) priceRanges['501-600']++;
        else if (transaction.price <= 700) priceRanges['601-700']++;
        else if (transaction.price <= 800) priceRanges['701-800']++;
        else if (transaction.price <= 900) priceRanges['801-900']++;
        else priceRanges['901-above']++;
    });

    const labels = Object.keys(priceRanges);
    const counts = Object.values(priceRanges);

    console.log(priceRanges);
    res.json({ labels, counts });
});


// Pie chart data for the selected month
app.get('/pie-chart', (req, res) => {
    const { month } = req.query;

    const filteredTransactions = transactions.filter(transaction => 
        new Date(transaction.dateOfSale).getMonth() + 1 === parseInt(month)
    );

    const categoryCounts = {};

    filteredTransactions.forEach(transaction => {
        if (categoryCounts[transaction.category]) {
            categoryCounts[transaction.category]++;
        } else {
            categoryCounts[transaction.category] = 1;
        }
    });

    res.json(categoryCounts);
});


// Combined data from the above APIs
app.get('/combined-data', async (req, res) => {
    const { month } = req.query;

    const statistics = await axios.get(`http://localhost:${PORT}/statistics`, { params: { month } });
    const barChart = await axios.get(`http://localhost:${PORT}/bar-chart`, { params: { month } });
    const pieChart = await axios.get(`http://localhost:${PORT}/pie-chart`, { params: { month } });

    res.json({
        statistics: statistics.data,
        barChart: barChart.data,
        pieChart: pieChart.data
    });
});
