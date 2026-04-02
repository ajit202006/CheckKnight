import { Router } from "express";
import { findUsers, getDashboard, updateProfile } from "../controllers/user.controller";
import { protectRoute } from "../middlewares/protectRoute";

const router = Router();

router.get("/dashboard", protectRoute, getDashboard);
router.put("/update-profile", protectRoute, updateProfile);
router.post("/users", protectRoute, findUsers);

export default router;