const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

const bodyParser = require('body-parser');

const config = require("../../../config/keys")
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const { protect } = require('../../middleware/authMiddleware');
const { google } = require('googleapis');

const User = require('../../models/User');
const OAuth2 = google.auth.OAuth2;


const oauthClient = new OAuth2(config.OAUTH_CLIENT_ID, config.OAUTH_CLIENT_SECRET);

oauthClient.setCredentials({ refresh_token: config.OAUTH_REFRESH_TOKEN });

const accessToken = oauthClient.getAccessToken();

router.use(express.json());
router.use(cors());
router.use(bodyParser.json())

// @desc register a user
router.post('/signup', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        res.json('invalid credentials')
    }

    //check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('Email already registered. Please sign In')
    }

    const salt = await bcrypt.genSalt(10);
    const pwdhash = await bcrypt.hash(password, salt);


    const user = await User.create(
        {
            email: email,
            password: pwdhash
        }
    );

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}))

// @desc authenticate a user
router.post('/signin', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}))

// @desc get authenticated user
router.get('/account', protect, asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
}))

// @desc send a r9eset password email
router.post('/forgotpassword', asyncHandler(async (req, res, next) => {

    const { email } = req.body

    //check if user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
        res.status(400);
        throw new Error('Invalid Email')
    }

    const transporter = nodemailer.createTransport(
        {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "rodrigolb01@gmail.com",
                clientId: config.OAUTH_CLIENT_ID,
                clientSecret: config.OAUTH_CLIENT_SECRET,
                refreshToken: config.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    );

    var mailOptions = {
        from: 'rodrigolb01@gmail.com',
        to: 'rodrigolb01@gmail.com',
        subject: 'Reset Password',
        html: generateHtml(userExists._id, generateToken(userExists._id))
    };

    transporter.sendMail(mailOptions, function (error, message) {
        if (error) {
            res.status = 400;
            throw new Error(error);
        }
        else {
            console.log(message);
            return (res.send({ Status: "Success" }));
        }
    })
}))

//@ desc: redefine
router.post("/resetpassword/:id/:token", asyncHandler(async (req, res, next) => {

    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status = 401;
            return res.json({ Status: "not authorized" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const pwdhash = await bcrypt.hash(password, salt);


            try {
                const res = await User.findByIdAndUpdate({ _id: id }, { password: pwdhash })
            } catch (error) {
                res.status = 400;
                throw new Error(error)
            }

            res.status = 200;
            return (res.send({ Status: "Success" }));
        }
    })
}))


// generated jwt token
const generateToken = (id) => {
    return (jwt.sign({ id }, config.JWT_SECRET, { expiresIn: '30d' }));
}

// generate reset password email
const generateHtml = (id, token) => {
    const link = `http://localhost:3000/resetpassword/${id}/${token}`;

    return `
    <div>
    <h4>Hi! We received a request to redefined your password. If that wasn't you, then you can just ignore this email. Otherwise click the link below to redefine your password</h4>
        <a href=${link}> Reset Password </a>
    <div/>
    `
}

module.exports = router;