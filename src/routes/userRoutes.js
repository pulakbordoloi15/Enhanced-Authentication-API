import express from 'express'
//import passport from 'passport'
import { register, login , logout } from '../controllers/userController.js'


const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);

export default router;