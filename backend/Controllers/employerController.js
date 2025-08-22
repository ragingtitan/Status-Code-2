import { Job } from "../Models/jobModels.js";
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isExpired: false });
    res.json({
      success: true,
      jobs,
    });
  } catch (err) {
    return res.json({ error: err.message, status: false });
  }
};

const postJob = async (req, res) => {
  const { role } = req.user;
  if (role === "jobseeker") {
    return res.json({message:"Job Seeker not allowed to access this endpoint!", status:false});
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    salaryType,
    salary,
    experience,
    jobType,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location || !salary || !experience || !jobType) {
    return res.json({message:'Please provide full job details!', status:false});
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    salaryType,
    salary,
    experience,
    jobType,
    postedBy,
  });
  res.json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
};

const getMyJobs = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "joobseeker") {
      return res.json({
        message: "Job seeker cannot access this Route!",
        status: true,
      });
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.json({
      success: true,
      myJobs,
    });
  } catch (err) {
    return res.json({ error: err.message, status: false });
  }
};

const updateJob = async (req, res) => {
  try{
    const { role } = req.user;
  if (role === "jobseeker") {
    return res.json({
      message: "Job seeker cannot access this Route!",
      status: true,
    });
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return res.json({message:"Job not found!", status:false});
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.json({
    success: true,
    message: "Job Updated!",
  });
  }
  catch(err){
    return res.json({error:err.message, status:false});
  }
};

const deleteJob = async (req, res) => {
  try{
    const { role } = req.user;
  if (role === "jobseeker") {
    return res.json({
      message: "Job seeker cannot access this Route!",
      status: true,
    });
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.json({
    success: true,
    message: "Job Deleted!",
  });
  }
  catch(err){
    return res.json({error:err.message, status:false});
  }
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.json({ message: "Please provide the job!", status: true });
    }
    res.json({
      success: true,
      job,
    });
  } catch (error) {
    return res.json({ error: "Job fetching failed!", status: false });
  }
};

export { getAllJobs, getMyJobs, updateJob, deleteJob, getSingleJob, postJob };
