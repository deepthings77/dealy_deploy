import express from 'express';
import upload from '../middlewares/multer.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import { googleLogin ,register, login, logout, getProfile, editProfile, getSuggestedUsers, followOrUnfollow , searchUsers, verifyEmail} from '../controllers/user.controller.js';


const router = express.Router();

router.route("/google-login").post(googleLogin);

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);
router.route('/search').get(isAuthenticated, searchUsers);
router.route('/verify-email').post(verifyEmail);

export default router;