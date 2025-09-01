const express = require('express');
const UserController = require('../controllers/UserController');
// const StudentController = require('../controllers/StudentController');
const router = express.Router();

// http://localhost:3000

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/user/signup', (req, res) => {
    res.render('signup');
})

router.post('/add/user', (req, res) => {
    UserController.addUser(req, res);
});

router.post('/login', (req, res) => {
    UserController.doLogin(req, res);
});

router.get('/student/add/page', (req, res) => {
    res.render('addStudent');
});
// router.get('/students/list/page', (req, res) => {
//     res.render('studentlist');
// });

// router.get('/student/list/page', (req, res) => {
//     res.render('studentlist');
// });

module.exports = router;