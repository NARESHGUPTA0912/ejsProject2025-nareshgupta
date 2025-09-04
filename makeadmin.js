const User = require('./models/User');
const bcrypt = require('bcrypt');

async function makeAdmin(){
    try {
        let user = await User.findOne({email: 'nareshguptang0912@gmail.com'});
        if(user) {
            console.log("User updated....");
        } else {
        let user = new User();
        user.firstName = 'Naresh ';
        user.lastName = 'Gupta';
        user.email = 'nareshguptang0912@gmail.com';
        let encryptedPassword = bcrypt.hashSync('ngupta91', 10);
        user.password = encryptedPassword;
        user.userType = 'Admin';
        await user.save();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = makeAdmin;