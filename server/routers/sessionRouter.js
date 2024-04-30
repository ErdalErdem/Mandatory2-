import { Router } from 'express';
import session from 'express-session';

const router = Router();

// Configure session middleware with secure settings
router.use(session({
    secret: 'your_secret_key', // Replace 'your_secret_key' with a real secret key for production
    resave: false,
    saveUninitialized: false, // change to false to comply with laws requiring permission before setting a cookie
    cookie: { secure: true, httpOnly: true, sameSite: 'lax' } // Secure cookie settings
}));

// Route to get the current user from the session
router.get('/session/getuser', (req, res) => {
    // Check if user session exists and respond accordingly
    if (req.session && req.session.user) {
        console.log(`userID ${req.session.user.id} retrieved.`);
        res.json({ success: true, user: req.session.user });
    } else {
        console.log("Session not found.");
        res.status(404).json({ success: false, message: "Session not found." });
    }
});

export default router;
