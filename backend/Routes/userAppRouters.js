import express from 'express';
import {checkServer, getParsedData, getParsedResumeStructure, analyseResume, analyseResumeStructure, uploadResume, getAllResume,getResumeById, getATSScore,deleteResumeById, getUpdatedResume } from "../Controllers/userAppControllers.js";
import { upload } from '../Utils/util.js';

const router = express.Router();


router.get('/', checkServer)
router.get('/get-all-resumes', getAllResume)
router.get('/get-resume-id',getResumeById)
router.get('/delete-resume-id/:name', deleteResumeById);
router.post('/uploadResume', upload.single('resume'), uploadResume)
router.get('/get-parsed-data/:name',getParsedData);
router.get('/get-parsed-resume-structure/:name', getParsedResumeStructure);
router.get('/analyse-resume/:name', analyseResume);
router.get('/analyse-resume-structure/:name', analyseResumeStructure);
router.get('/get-ats-score/:name', getATSScore);
router.post('/get-updated-resume/:name', getUpdatedResume)

export {router as userAppRouters};