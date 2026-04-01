import { Router } from "express";
import { getDashboard, updateProfile } from "../controllers/user.controller";
import { protectRoute } from "../middlewares/protectRoute";

const router = Router();

router.get("/dashboard", protectRoute, getDashboard);
router.put("/update-profile", protectRoute, updateProfile);

export default router;