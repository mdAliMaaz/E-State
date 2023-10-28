import express from 'express';

import { login, signip } from '../controllers/user.controller.js';


const router = express.Router()

router.route("/signup").post(signip);

router.route("/login").post(login);


export default router;
