const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    if (!description || !amount || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const transaction = await Transaction.create({ description, amount, type });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get paginated list of transactions
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await Transaction.findAll({ page, limit });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single transaction by id
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by id
router.put('/:id', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const transaction = await Transaction.update(req.params.id, { description, amount, type });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction by id
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.delete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
