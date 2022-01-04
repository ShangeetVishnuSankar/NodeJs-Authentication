const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registerValidation, loginValidation} = require('../validation');

//validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
//SIGNUP
router.post('/register',
    async (req, res) => {

        //Shorter version to retrieve just the error instead of everything.
        const {error} = registerValidation(req.body);
        if (error) res.status(400).send(error.details[0].message);

        //checking if the user is already in the database
        const emailExists = await User.findOne({ email: req.body.email})
        if (emailExists) return res.status(400).send('email already exists');

        //Hashing passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const shan = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await shan.save();
            res.send(shan);
        } catch (e) {
            console.log(e);
        }
    });

//LOGIN
router.post('/login',async (req,res) => {

    //Validating incoming data
    const {error} = loginValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user = await User.findOne({ email: req.body.email})
    if (!user) return res.status(400).send('user does not exist');

    //Checking if Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('invalid passwords');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).send(token);


    res.send('logged in');
})

module.exports = router;