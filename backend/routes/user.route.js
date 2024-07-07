import express from 'express';
import { signup, login, verifyYourMail } from "../controller/usercontroller.js"

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyYourMail);

export default router;
