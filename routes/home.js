import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router(); 

router.get('/home', authenticateToken, (req, res) => {
    res.send(req.user)
})

export default router;