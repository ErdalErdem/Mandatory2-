import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection.js';

const router = Router();

// Login route
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Fetch the user from the database
        const userQuery = await db.get('SELECT id, email, password, name FROM Users WHERE email = ?', [email]);
        if (!userQuery) {
            console.log("Attempted login with non-existent email:", email);
            return res.status(404).json({ message: "User not found" });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, userQuery.password);
        if (isMatch) {
            // Set user information in session, excluding the password
            req.session.user = {
                id: userQuery.id,
                email: userQuery.email,
                name: userQuery.name
            };
            console.log("User with ID: " + userQuery.id + " has logged in");
            res.json({ message: "Logged in successfully" });
        } else {
            console.log("Incorrect passwprd user ID: " + userQuery.id);
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Logout route
router.get('/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error detroying session:", err);
            return res.status(500).json({ message: "Error, not logging out" });
        }
        res.clearCookie('sid');  // Assuming 'sid' is the session ID cookie name
        console.log("Logged out and session destroyed");
        res.json({ message: "Logged out successfully" });
    });
});

export default router;
