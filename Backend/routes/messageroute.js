import express from "express"
import {sendMessage,getMessage} from "../controllers/messageControllers.js"
import isAuthenticate from "../midddleware/isAuthenticated.js"

const router = express.Router();
router.route("/send/:id").post(isAuthenticate,sendMessage);
router.route("/:id").get(isAuthenticate,getMessage);

export default router;