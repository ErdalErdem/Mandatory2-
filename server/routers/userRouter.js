import { Router } from 'express';
import bcrypt from 'bcrypt';
const router = Router();
import db from '../database/connection.js';

// GET all users
router.get('/api/users', async (req, res) => {
    try {
        const result = await db.all('SELECT * FROM Users'); // Avoid sending passwords
        res.send({ data: result });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ error: 'Failed to retrieve users' });
    }
});

// POST create a new user
router.post('/api/users', async (req, res) => {
    const { name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ error: 'Missing required information' });
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
        const { lastID } = await db.run(sql, [name, email, hashedPassword]);
        res.status(201).send({ message: 'User created successfully', userId: lastID });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ error: 'Database operation failed' });
    }
});

export default router;

