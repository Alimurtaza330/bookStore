import express from 'express';
import { signup, login, verifyYourMail, forgotPassword, resetPassword } from "../controller/usercontroller.js"

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyYourMail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',resetPassword );


export default router;
