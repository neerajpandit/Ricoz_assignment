import express from 'express';
import { signup, signin, logout, singleUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/user/:id', singleUser);

export default router;
