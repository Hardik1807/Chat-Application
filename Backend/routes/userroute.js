import express from "express"
import {register,login,logout,getOtherUser} from "../controllers/userControllers.js"
import isAuthenticate from "../midddleware/isAuthenticated.js"

const router = express.Router();

router.use(express.json())
router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/").get(isAuthenticate,getOtherUser);

export default router;
