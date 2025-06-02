import express from "express";
import { getuserByid, login, register } from "../Controller/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getuserbyid/:id", getuserByid);

export default router;
