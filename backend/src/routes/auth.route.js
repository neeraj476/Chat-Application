import { Router } from "express";
import { login, logout, signup, checkAuth , updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute,checkAuth);  
router.get("/update-profile", protectRoute,updateProfile);  

export default router;
