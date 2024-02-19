import express from 'express';
import { signup, signin, logout, singleUser, userProfile } from "../controllers/auth.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/getme', isAuthenticated, userProfile);
router.get('/user/:id', singleUser);

export default router;
