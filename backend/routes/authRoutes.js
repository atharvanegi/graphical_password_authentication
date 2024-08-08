import express from 'express';
import { register, validateEmail ,login } from '../controllers/authController.js';

const router = express.Router();

router.route('/register').post(register);

router.route('/validate/register/:email').get(validateEmail);

router.route('/validate/login/:email').get(validateEmail);

router.route('/login').post(login);

export default router;