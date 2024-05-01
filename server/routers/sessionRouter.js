import { Router } from 'express';

const router = Router();

router.get('/session/getuser', (req, res) => {
    if (req.session.user) {
        res.send({ user: req.session.user });
        console.log(`Session for userID ${req.session.user.id} retrieved.`);
    } else {
        res.status(404).send({ message: "No session found." });
        console.log("No session found.");
    }
});

export default router;