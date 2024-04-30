import { Router } from 'express';
import escape from 'escape-html';
import helmet from 'helmet';  // Import helmet for setting security-related HTTP headers

const router = Router();

// Middleware to apply security headers with Helmet
router.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],  // Only allow scripts from the same origin
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    }
}));

const messages = [];

// Fetch messages with escaping to prevent XSS
router.get('/xss/messages', (req, res) => {
    res.send({ data: messages });  // Escaping is done before storing, so no need to escape again here
});

// Save a new message with XSS escaping
router.post('/xss/messages', (req, res) => {
    if (!req.body.message) {
        return res.status(400).send({ error: 'Message content cannot be empty' }); // Validate input
    }
    const escapedMessage = escape(req.body.message);  // Escape special HTML characters to prevent XSS
    messages.push(escapedMessage);
    res.status(201).send({ data: messages });  // Return the updated list of messages
});

export default router;
