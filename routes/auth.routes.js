const {Router} = require('express')
const {check, validationResult}=require('express-validator')
const User = require('../models/user')
const router = Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

// /api/auth
router.post(
    '/register',
    [
        check('email','incorrect email').isEmail(),
        check('password','empty pass not possible and must >6 symb').isLength({min:6})
    ] 
    ,
    async (req, res) => {
        try {
            // console.log("REGISTER - req.BODY =", req.body);
            const errors=validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors:errors.array(),
                message:'auth.routes - > incorrect registered info'})
            }

            const {email, password} = req.body
            const candidate = await User.findOne({
                email: email
            })

            if (candidate) {
                return res.status(400).json({
                    message: 'user already exist!'
                })
            }
            const hashedpass=await bcrypt.hash(password, 12)
            const user=new User({email:email, password:hashedpass})
            await user.save()
            res.status(201).json({message:'user created '})
        } catch (error) {
            res.status(500).json({
                message: 'server error - try again'
            })
        }
    })

// /api/auth
router.post(
    '/login',
    [
       check('email', 'Enter correct email').normalizeEmail().isEmail(),
       check('password', 'Verify entered password!').exists() 
    ],
    async (req, res) => {
    try {
console.log("LOGIN start", req.body);
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect INITIAL LOGIN info'
            })
        }

        const {email,password} = req.body
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({
                message: 'user didn\'t exist!'
            })
        }
// console.log("found user=", user);
        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(400).json({
                message: 'wrong password'
            })
        }
        const token = jwt.sign({ userId: user.id }, config.get('jwtsecret'), {expiresIn: '1h'})
console.log("STER-2", user.id);
        res.json({token, userId:user.id})
    } catch (error) {
        res.status(500).json({
            message: 'server Login error - try again'
        })
    }
    })

module.exports = router
