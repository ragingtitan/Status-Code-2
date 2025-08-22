import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import url from 'url';
import path from 'path';

import jwt from 'jsonwebtoken';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

// Send password reset link
 const info = async (email, username, prompt) => {
    const sendMail = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "You made new notes",
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    </head>
    <body class="bg-gray-100">
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="bg-blue-600 text-white p-6 text-center text-2xl font-bold">
        Your Requested Information
    </div>
    <div class="p-6">
        <p class="text-gray-700 text-base mb-4">
            Dear ${username},
        </p>
        <p class="text-gray-700 text-base mb-4">
           Here is the text you entered:
        </p>
        <div class="bg-gray-100 border border-gray-300 p-4 rounded-lg mb-4">
            <div class="text-gray-800">${prompt}</div>
        </div>
        <p class="text-gray-700 text-base mb-4">
            To explore more and access your notes, please click the link below:
        </p>
        <a href="http://localhost:5173/" class="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg text-base font-medium hover:bg-blue-700">
            Go to site
        </a>
    </div>
    <div class="bg-gray-200 text-gray-600 text-center py-4 text-sm">
        <p>
            If you have any further questions or need additional assistance, feel free to reply to this email.
        </p>
        <p class="mt-2">
            Best regards,<br>
            Anish<br>
            admin<br>
            Notes Maker AI<br>
            anishdas506@gmail.com<br>
        </p>
    </div>
    </div>
    </body>
    </html>
    `
    
    });
    
    console.log("Message sent: %s", sendMail.messageId);
 }


 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        if(!file){
            return cb(new Error("Please provide the file!"));

        }
        const folderName = file.fieldname.charAt(0).toUpperCase() + file.fieldname.slice(1).toLowerCase();
        console.log(`./uploaded${folderName}s`);
        if(!fs.existsSync(`./uploaded${folderName}s`)){
            fs.mkdirSync(`./uploaded${folderName}s`);
        }
        cb(null, `./uploaded${folderName}s`); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        console.log(file)

        const token = req.cookies.isLoggedIn;
        console.log(token);
        if (!token) {
            return cb(new Error("Authentication token is missing!"));
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        if (!decodedToken) {
            return cb(new Error("Please login and try again! (JWT Mismatch)"));
        }
        const timestamp = Date.now()
        const userId = decodedToken.id;
        const ext = path.extname(file.originalname);
        
        const newFilename = `${file.fieldname}_${userId}_${timestamp}${ext}`;
        console.log(newFilename)
        if(!fs.existsSync(newFilename)){

            return cb(null, newFilename);
        }
        else{
            return cb(new Error("This file already exists!"));

        }
    }
});

const findProfilePicture = (userId) => {
    // Define the profile picture directory
    const profilePicDir = path.join(__dirname, '../uploadedFiles/');
  
    // Read all files in the directory
    const files = fs.readdirSync(profilePicDir);
  
    // Find the file that matches the user ID pattern
    const profilePicture = files.find(file => file.startsWith(`profilepicture_${userId}`));
  
    if (!profilePicture) {
      console.log('Profile picture not found!');
      return null;
    }
  
    // Return the full path of the profile picture
    const filePath = path.join(profilePicDir, profilePicture);
    const fileName = path.basename(filePath)
    console.log('Profile picture found:', fileName);
    return fileName;
  };

const upload = multer({ storage: storage });

const filterResumesById = (userId) => {
    const folderPath = "./uploadedResumes"
    const resumes = fs.readdirSync(folderPath);
    console.log(resumes)
    const filteredResumes = resumes.filter((element)=>{
        console.log((element.split('_')[1]))
        return (element.split('_')[1]===userId)
    })
    return filteredResumes;
}

const getLatestResume=(filteredResumes)=>{
    let maxDate = new Date(0);
    let latestResumeName = "";
    filteredResumes.forEach(element=>{
        const dateString = element.split('_')[2].slice(0,-4);
        console.log(dateString)
        const date = new Date(Number(dateString));
        console.log(date)
        if(date>maxDate){
            maxDate=date;
            latestResumeName=element;
        }
    })
    return [maxDate,latestResumeName];
}

const getAllResumes = ()=>{
    const folderPath = "./uploadedResumes"
    const resumes = fs.readdirSync(folderPath);
    return resumes;
}

const deleteResume = (name)=>{
    const folderPath = "./uploadedResumes"
    fs.unlink(folderPath+"/"+name, (err)=>{
        if(err){
            throw new Error(err);
        }
    });
}

export { transporter,info, upload, findProfilePicture, filterResumesById, getLatestResume,getAllResumes, deleteResume };