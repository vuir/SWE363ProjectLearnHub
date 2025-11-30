const mongoose= require("mongoose");
const Session = require("../models/Session");
const Tutor = require("../models/TutorProfile");
const Course = require("../models/Course");

/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function createSession(req, res){
    if (!req?.body?.courseId || !req?.body?.tutorId || !req?.body?.title || !req?.body?.dateTime || !req.body.teamsLink) {
        return [400, { "message": "tutorId,courseId,title,dateTime and teamsLink are required" }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
        return [400, { "message": "Course id is not valid." }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.tutorId)) {
        return [400, { "message": "tutor id is not valid." }, null];}
    try {
        const result = await Session.create({
            courseId: req.body.courseId,
            tutorId: req.body.tutorId,
            description: req.body.description,
            title: req.body.title,
            dateTime: req.body.dateTime,
            teamsLink: req.body.teamsLink,
            status: req.body.status,
        });
        const touter = await Tutor.findById(req.body.tutorId);
        touter.coursesTaught.push(req.body.courseId);
        await touter.save();
        console.log("Session Created ");
        return [201, { result, touter }, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
async function readSession() {
    try{
         const allSession = await Session.find();
         if (!allSession.length) 
            {return [204, { "message": "No Sessions are found." }, null];}
         return [200, allSession, null];
      }
      catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function updateSession(req, res){
    if (!req?.body?.courseId || !req?.body?.tutorId || !req?.body?.title || !req?.body?.dateTime || !req.body.teamsLink) {
        return [400, { "message": "tutorId,courseId,title,dateTime and teamsLink are required" }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
        return [400, { "message": "Course id is not valid." }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.tutorId)) {
        return [400, { "message": "tutor id is not valid." }, null];}
    try {
            const session = await Session.findOne({
                courseId: req.body.courseId,
                tutorId: req.body.tutorId,
                });
            if(session.tutorId!=req.body.tutorId){
                const touterOld = await Tutor.findById(session.tutorId);
                touter.coursesTaught = touter.coursesTaught.filter(id => id.toString() !== req.body.courseId);
                await touterOld.save();
                const touterNew = await Tutor.findById(req.body.tutorId);
                touterNew.coursesTaught.push(req.body.courseId);
                await touterNew.save();
            }
            session.courseId=req.body.courseId;
            session.description=req.body.description;
            session.tutorId=req.body.tutorId
            session.title=req.body.title;
            session.dateTime=req.body.dateTime;
            session.teamsLink=req.body.teamsLink;
            session.status=req.body.status;
        await session.save();
        console.log("Session updated");
        return [201, { result, session }, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};