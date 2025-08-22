import mongoose from 'mongoose';


const companyInfoSchema = new mongoose.Schema({
    indeedUrl: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
  });

  const searchInfoSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
  })

const jobSchema = new mongoose.Schema({
    _id:{
        type:Object,
        required:true
    },
    id:{
        type:Object,
        required:true
    },
    salary:{
        type:Number,
        default:0,
        required:false
    },
    postedAt:{
        type:String,
        default:"justPosted",
        required:false
    },
    externalApplyLink:{
        type:String,
        default:"",
        required:false
    },
    positionName:{
        type:String,
        default:"",
        required:true
    },
    jobType:{
        type:String,
        default:"",
        required:false
    },
    company:{
        type:String,
        default:"",
        required:true
    },
    location:{
        type:String,
        default:"",
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:false
    },
    reviewsCount:{
        type:Number,
        default:0,
        required:false
    },
    urlInput:{
        type:String,
        default:null,
        required:false
    },
    url:{
        type:String,
        default:"",
        required:false
    },
    scrapedAt:{
        type:Date,
        required:true
    },
    postingDateParsed:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    descriptionHTML:{
        type:String,
        default:"",
        required:false
    },
    searchInput:{
        type:searchInfoSchema,
        required:true
    },
    isExpired:{
        type:Boolean,
        required:true
    },
    companyInfo: {
        type: companyInfoSchema,
        required: true,
      }

});

const Job = mongoose.model('jobs', jobSchema);

export { Job };