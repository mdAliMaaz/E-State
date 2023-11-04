import express from 'express';

import { getMyProfile, login, logout, signip, updateProfile } from '../controllers/user.controller.js';
import { Protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/getProfile").get(Protect
    , getMyProfile);
router.route("/updateProfile").put(Protect, updateProfile);

router.route("/signup").post(signip);

router.route("/login").post(login);

router.route("/logout").post(logout);


export default router;
