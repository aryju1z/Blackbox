const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionsRouter = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
