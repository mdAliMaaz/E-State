import express from 'express';

import { login, logout, signip } from '../controllers/user.controller.js';


const router = express.Router()

router.route("/signup").post(signip);

router.route("/login").post(login);

router.route("/logout").post(logout);


export default router;
