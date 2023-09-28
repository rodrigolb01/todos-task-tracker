const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../../models/User');
const secret = require("../../../config/keys").JWT_SECRET;
const { protect } = require('../../middleware/authMiddleware')

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(express.json());

// @desc register a user
router.post('/signup', asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
    {
        res.status(400);
        res.json('invalid credentials')
    }

    //check if user exists
    const userExists = await User.findOne({email});

    if(userExists)
    {
        res.status(400);
        throw new Error('Email already registered. Please sign In')
    }

    const salt = await bcrypt.genSalt(10);
    const pwdhash = await bcrypt.hash(password, salt);

    console.log('generating user');

    const user = await User.create(
        {
            email: email,
            password: pwdhash
        }
    );

    if(user)
    {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error("Invalid user data");
    }
}))

// @desc authenticate a user
router.post('/signin', asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}))

// @desc get authenticated user
router.get('/account', protect, asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
}))


// generated jwt token
const generateToken = (id) => {
    return(jwt.sign({ id }, secret, { expiresIn: '30d' }));
}

module.exports = router;