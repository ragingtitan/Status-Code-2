import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../Controllers/employerController.js";
import { authenticateUser } from "../Middlewares/middlewares.js";
const router = express.Router();

router.get("/getAllJobs", getAllJobs);
router.post("/postJob",authenticateUser,  postJob);
router.get("/getmyjobs",authenticateUser, getMyJobs);
router.post("/update/:id",authenticateUser, updateJob);
router.post("/delete/:id",authenticateUser, deleteJob);
router.get("/:id",authenticateUser, getSingleJob);

export { router as userEmployerJobRouters }
