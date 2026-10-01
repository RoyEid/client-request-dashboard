import express from "express"
import { getRequests, createRequest, updateRequestStatus } from "../controllers/requestController.js"

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.patch("/:id/status", updateRequestStatus);

export default router;

