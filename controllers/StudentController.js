const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;
async function addStudent(req, res) {
    try {
        let result;
        if(req.file){
            cloudinary.config({
                cloud_name: 'duym3mz0r',
                api_key: '553994598228288',
                api_secret: 'e3tl1xNATGyaeEm2I9Y1_KIsPRw'
            });
            result = await cloudinary.uploader.upload(req.file.path);
        }
        let student = new Student(req.body);
        if(req.file){
            student.studentImage = result.secure_url;
            }
        await student.save();
        let students = await Student.find({});
        res.render('studentlist', {
            students: students
        });
    } catch (error) {
        console.log(error);
    }
}

async function listStudents(req, res) {
    try {
        let students = await Student.find({});
        res.render('studentlist', {
            students: students
        }); 
    } catch (error) {
        console.log(error);
    }
}

async function deleteStudent(req, res){
    try {
        let studentId = req.params._id;
        await Student.deleteOne({_id: studentId});
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students: students
        });
    } catch (error) {
        console.log(error);
    }
}

async function openEditPage(req, res) {
    try {
        let studentId = req.params._id;
        let student = await Student.findOne({_id: studentId});
        if(student) {
            res.render('studenteditpage', {
                student: student
            });
        } else {
            res.render("/");
        }
        
    } catch (error) {
        console.log(error);
    }
}


// /edit/student/:id
async function editStudent(req, res){
    try {
        const studentId = req.params._id;
        let student = await Student.findOne({ _id: studentId });
        if(student) {
            // update the details
            student.rollNo = req.body.rollNo;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.motherName = req.body.motherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmission = req.body.yearOfAdmission;
            await student.save();
            // console.log("Student details updated successfully");
            let students = await Student.find({});
            res.render('welcomeadmin', {
                students: students
            });
        } else {
            res.status(404).send("Student not found.... ");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addStudent,
    listStudents,
    deleteStudent,
    openEditPage,
    editStudent
}