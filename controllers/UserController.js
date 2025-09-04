const User = require('../models/User')
const Student = require('../models/Student')
const bcrypt = require('bcrypt');
async function addUser(req, res) {
    
    try {
        let user = new User(req.body);
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = encryptedPassword;
        await user.save();
        // res.end("User Add in Database Successfully...");
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

async function doLogin(req, res){
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword){
                if(user.userType === 'Admin'){
                    let students = await Student.find({});
                    res.render("welcomeadmin", {
                        students: students
                    });
                } else {
                    res.render('welcomestudent');
                }
            } else {
                res.end("Invalid email/password");
            }
        } else {
            res.end("<h1> User does not exist");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    doLogin
}