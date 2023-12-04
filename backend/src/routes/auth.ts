import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import controller from '../controllers/auth';

const router = express.Router();

router.get('/login', controller.authUser);
router.get('/google/callback', controller.googleCallback);
router.get('/login/failure', controller.authFailure);
router.get('/login/success', controller.authSuccess);
router.get('/protected', isAuthenticated, controller.protectedRoute);
router.get('/logout', controller.logout);

export default router;
