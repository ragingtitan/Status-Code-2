import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import {
  filterResumesById,
  getLatestResume,
  getAllResumes,
  deleteResume,
} from "../Utils/util.js";
import userModel from "../Models/userAuthModels.js";
const microservice_resume_parser = process.env.MICROSERVICE_RESUME_PARSER;
console.log(microservice_resume_parser);

const checkServer = (request, response) => {
  axios
    .get(microservice_resume_parser)
    .then(({ data: { message } }) => {
      return response.json({ message, status: true });
    })
    .catch((err) => {
      return response.json({ error: err.message, status: false });
    });
};
// These two lines recreate __dirname

const getAllResume = async (request, response) => {
  return response.json({ resumes: getAllResumes() });
};

const getResumeById = async (request, response) => {
  const { userId } = request;
  console.log(userId);
  return response.json({ resumes: filterResumesById(userId), status: true });
};

const deleteResumeById = async (request, response) => {
  try {
    //call delete function
    const { name } = request.params;
    console.log(name);
    deleteResume(name);
    if (!filterResumesById(request.userId)) {
      await userModel.findByIdAndUpdate(userId, {
        $set: {
          "profile.preferences.jobSeeker.resume": false,
        },
      });
    }
    return response.json({
      message: "Resume deleted successfully!",
      status: true,
    });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};

const uploadResume = async (request, response) => {
  if (!request.file) {
    return response.json({
      message: "Please provide the resume!",
      status: false,
    });
  }
  const userId = request.userId;
  await userModel.findByIdAndUpdate(userId, {
    $set: {
      "profile.preferences.jobSeeker.resume": true,
    },
  });
  return response.json({ message: "Resume uploaded!", status: true });
};

const getParsedData = async (request, response) => {
  try {
    const form = new FormData();
    const latestResume = getLatestResume(filterResumesById(request.userId))[1];
    if (!latestResume) {
      return response.json({ message: "Please upload the resume!" });
    }
    const filePath = `./uploadedResumes/${latestResume}`;
    const fileStream = fs.createReadStream(filePath);

    form.append("resume", fileStream, latestResume); // 'file' is the field name expected by the other server
    axios
      .post(microservice_resume_parser + "/get-parsed-data", form, {
        headers: {
          ...form.getHeaders(),
          "Content-Type": "multipart/form-data",
          // Optional: include any auth tokens here if needed
          // 'Authorization': `Bearer YOUR_API_KEY`
        },
      })
      .then(({ data: { message } }) => {
        return response.json({ message, status: true });
      })
      .catch((err) => {
        return response.json({ error: err.message, status: false });
      });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};

const getParsedResumeStructure = async (request, response) => {
  try {
    const form = new FormData();
    const latestResume = getLatestResume(filterResumesById(request.userId))[1];
    if (!latestResume) {
      return response.json({ message: "Please upload the resume!" });
    }
    const filePath = `./uploadedResumes/${latestResume}`;
    const fileStream = fs.createReadStream(filePath);
    form.append("resume", fileStream, latestResume); // 'file' is the field name expected by the other server
    axios
      .post(microservice_resume_parser + "/get-parsed-resume-structure", form, {
        headers: {
          ...form.getHeaders(),
          "Content-Type": "multipart/form-data",
          // Optional: include any auth tokens here if needed
          // 'Authorization': `Bearer YOUR_API_KEY`
        },
      })
      .then(({ data: { message } }) => {
        return response.json({ message, status: true });
      })
      .catch((err) => {
        return response.json({ error: err.message, status: false });
      });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};

const analyseResume = async (request, response) => {
  try {
    const form = new FormData();
    const { name } = request.params;
    const filePath = `./uploadedResumes/${name}`;
    const fileStream = fs.createReadStream(filePath);
    form.append("resume", fileStream, name); // 'file' is the field name expected by the other server
    axios
      .post(microservice_resume_parser + "/analyse-resume", form, {
        headers: {
          ...form.getHeaders(),
          "Content-Type": "multipart/form-data",
          // Optional: include any auth tokens here if needed
          // 'Authorization': `Bearer YOUR_API_KEY`
        },
      })
      .then(({ data: { message } }) => {
        return response.json({ message, status: true });
      })
      .catch((err) => {
        return response.json({ error: err.message, status: false });
      });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};
const analyseResumeStructure = async (request, response) => {
  try {
    const form = new FormData();
    const latestResume = getLatestResume(filterResumesById(request.userId))[1];
    if (!latestResume) {
      return response.json({ message: "Please upload the resume!" });
    }
    const filePath = `./uploadedResumes/${latestResume}`;
    const fileStream = fs.createReadStream(filePath);
    form.append("resume", fileStream, latestResume); // 'file' is the field name expected by the other server
    axios
      .post(microservice_resume_parser + "/analyse-resume-structure", form, {
        headers: {
          ...form.getHeaders(),
          "Content-Type": "multipart/form-data",
          // Optional: include any auth tokens here if needed
          // 'Authorization': `Bearer YOUR_API_KEY`
        },
      })
      .then(({ data: { message } }) => {
        return response.json({ message, status: true });
      })
      .catch((err) => {
        return response.json({ error: err.message, status: false });
      });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};

const getATSScore = async (request, response) => {
  try {
    const form = new FormData();
    const { name } = request.params;
    if (!name) {
      return response.json({
        message: "Please provide the resume name!",
        status: false,
      });
    }
    const filePath = `./uploadedResumes/${name}`;
    console.log(filePath)
    const fileStream = fs.createReadStream(filePath);
    form.append("resume", fileStream, name);
    axios
      .post(microservice_resume_parser + "/get-ats-score", form, {
        ...form.getHeaders(),
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        return response.json({ atsScore: res.data.message, status: true });
      })
      .catch((err) => {
        return response.json({ error: err, status: false });
      });
  } catch (err) {
    return response.json({ error: err, status: false });
  }
};

const getUpdatedResume = async (request, response) => {
  try {
    const form = new FormData();
    const { name } = request.params;
    if (!name) {
      return response.json({
        message: "Please provide the resume name!",
        status: false,
      });
    }
    const filePath = `./uploadedResumes/${name}`;
    const fileStream = fs.createReadStream(filePath);
    form.append("resume", fileStream, name);
    axios
      .post(microservice_resume_parser + "/get-updated-resume", form, {
        headers: {
          ...form.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        const updatedResumeBuffer = res.data;
        const updatedFilePath = `./uploadedResumes/updated_${name}`;
    
        fs.writeFileSync(updatedFilePath, updatedResumeBuffer);
    
        // Respond with the file directly
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', `attachment; filename=updated_${name}`);
        return response.send(updatedResumeBuffer); // send PDF buffer to frontend
      })
      .catch((err) => {
        return response.json({ error: err.message, status: false });
      });
  } catch (err) {
    return response.json({ error: err.message, status: false });
  }
};

export {
  checkServer,
  getParsedData,
  analyseResume,
  analyseResumeStructure,
  getParsedResumeStructure,
  uploadResume,
  getAllResume,
  getResumeById,
  getATSScore,
  deleteResumeById,
  getUpdatedResume,
};
