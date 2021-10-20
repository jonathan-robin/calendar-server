import express from 'express';
import { User } from '../classes/user.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router(); 

router.post('/home', authenticateToken, (req, res) => {
    console.log('enter home')
    res.send('send from home'); 
})

export default router;