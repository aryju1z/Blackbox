const db = require('../config/database');

class Transaction {
  static async create({ description, amount, type }) {
    const query = `
      INSERT INTO transactions (description, amount, type)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [description, amount, type];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT *
      FROM transactions
      ORDER BY date DESC
      LIMIT $1 OFFSET $2
    `;
    const countQuery = 'SELECT COUNT(*) FROM transactions';
    
    const [results, countResult] = await Promise.all([
      db.query(query, [limit, offset]),
      db.query(countQuery)
    ]);

    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      transactions: results.rows,
      pagination: {
        total: totalItems,
        totalPages,
        currentPage: page,
        limit
      }
    };
  }

  static async findById(id) {
    const query = 'SELECT * FROM transactions WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { description, amount, type }) {
    const query = `
      UPDATE transactions
      SET description = $1, amount = $2, type = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const values = [description, amount, type, id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM transactions WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Transaction;
