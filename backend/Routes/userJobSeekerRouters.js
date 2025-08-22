import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../Controllers/jobseekerController.js";

const router = express.Router();

router.post("/postJobApplication", postApplication);
router.get("/employer/getall", employerGetAllApplications);
router.get("/jobseeker/getall", jobseekerGetAllApplications);
router.post("/delete/:id", jobseekerDeleteApplication);

export { router as userJobSeekerRouters };
