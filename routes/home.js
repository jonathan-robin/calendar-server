import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router(); 

router.post('/home', authenticateToken, (req, res) => {
    // console.log(req)
    res.send(req.user)
    // res.send(req.user);
})

export default router;