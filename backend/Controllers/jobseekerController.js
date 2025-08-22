import cloudinary from "cloudinary";
import { Job } from "../Models/jobModels.js";

const postApplication =async (req, res ) => {
  // const { role } = req.user;
  // if (role === "Employer") {
  //   return res.json({message:"Employers not allowed to access this endpoint!", status:false});
  // }
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.json({message:"File required", status:false});
  // }

  // const { resume } = req.files;
  // const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  // if (!allowedFormats.includes(resume.mimetype)) {
  //   return next(
  //     new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
  //   );
  // }
  // const cloudinaryResponse = await cloudinary.uploader.upload(
  //   resume.tempFilePath
  // );

  // if (!cloudinaryResponse || cloudinaryResponse.error) {
  //   console.error(
  //     "Cloudinary Error:",
  //     cloudinaryResponse.error || "Unknown Cloudinary error"
  //   );
  //   return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  // }
  // const { name, email, coverLetter, phone, address, jobId } = req.body;
  // const applicantID = {
  //   user: req.user._id,
  //   role: "jobseeker",
  // };
  // if (!jobId) {
  //   return res.json({message:"Job not found!", status:false});
  // }
  // const jobDetails = await Job.findById(jobId);
  // if (!jobDetails) {
  //   return res.json({message:"Job not found!", status:false});
  // }

  // const employerID = {
  //   user: jobDetails.postedBy,
  //   role: "Employer",
  // };
  // if (
  //   !name ||
  //   !email ||
  //   !coverLetter ||
  //   !phone ||
  //   !address ||
  //   !applicantID ||
  //   !employerID ||
  //   !resume
  // ) {
  //   return res.json({message:"Please fill all fields", status:false});
  // }
  // const application = await Application.create({
  //   name,
  //   email,
  //   coverLetter,
  //   phone,
  //   address,
  //   applicantID,
  //   employerID,
  //   resume: {
  //     public_id: cloudinaryResponse.public_id,
  //     url: cloudinaryResponse.secure_url,
  //   },
  // });
  // res.json({
  //   success: true,
  //   message: "Application Submitted!",
  //   application,
  // });
};

const employerGetAllApplications =
  async (req, res) => {
    const { role } = req.user;
    if (role === "jobseeker") {
      return res.json({message:"Job Seekers not allowed to access this endpoin!", status:false});
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.json({
      success: true,
      applications,
    });
  };

const jobseekerGetAllApplications = 
  async (req, res) => {
    const { role } = req.user;
    if (role === "Employer") {
      return res.json({message:"Employers not allowed to access this endpoint!", status:false});
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.json({
      success: true,
      applications,
    });
  };

const jobseekerDeleteApplication = 
  async (req, res) => {
    const { role } = req.user;
    if (role === "Employer") {
      return res.json({message:"Employers not allowed to access this endpoint!", status:false});
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.json({message:"Application not found!", status:false});
    }
    await application.deleteOne();
    res.json({
      success: true,
      message: "Application Deleted!",
    });
  };


export {postApplication,employerGetAllApplications,jobseekerGetAllApplications,jobseekerDeleteApplication }