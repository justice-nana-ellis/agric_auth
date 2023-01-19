require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../config/db');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "nanatetragramatonages";

const verifyUserToken =  async(token)=> {
    const user =  await jwt.verify(
         token,
         SECRET_KEY,
         (err, decoded) => {
             if (err) return  Promise.reject(err);
             if (err) return  Promise.resolve(decoded);
         }
     );
     return user;
 }

const registerUser = async (req, res) => {

    try {

        const user = {
            id: req.body.id,
            user_id: req.body.user_id,
            account_type: req.body.account_type,
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
            mobile_number: req.body.mobile_number,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            next_of_kin: req.body.next_of_kin,
            national_id: req.body.national_id,
            payment_option: req.body.payment_option
        };
        
        // check Entries
        const checkEntries = async(req, res) => {
            if (!user.account_type || !user.email || !user.password || !user.date_of_birth || !user.mobile_number || !user.location || !user.next_of_kin || !user.national_id || !user.payment_option || !user.name ) {
                return res.status(404).send("⚠ All Entries Required");
            }

        }

        checkEntries(req, res);

        // check existence
        const emailExist = await User.findOne({where: {email: user.email}});
        const nameExist = await User.findOne({where: {name: user.name}});
        const idExist = await User.findOne({where: {name: user.national_id}});
        const pwdExist = await User.findOne({where: {password: user.password}});

        // database conflicts
        if (emailExist) { 
            return res.status(409).json({'message': '⚠ Conflict! Email Exists!'});
        }

        if (nameExist) { 
            return res.status(409).json({'message': '⚠ Conflict! Name Exists!'});
        }

        if (idExist) { 
            return res.status(409).json({'message': '⚠ Conflict! National ID Exists!'});
        }

        if (pwdExist) { 
            console.log(pwdExist);
            return res.status(409).json({'message': '⚠ Conflict! Passcode Exists!'});
        }

        // hash password
        const hashedPwd = await bcrypt.hash(user.password, 10);

        // new user
        const newUser = {
            id: user.id,
            user_id: user.user_id,
            account_type: user.account_type,
            name: user.name,
            date_of_birth: user.date_of_birth,
            mobile_number: user.mobile_number,
            email: user.email,
            password: hashedPwd,
            location: user.location,
            next_of_kin: user.next_of_kin,
            national_id: user.national_id,
            payment_option: user.payment_option
        }

        // create new user
        if ((emailExist, nameExist, idExist, pwdExist) == null) {

            User.create(newUser);

            // email verification

            // login

            console.log(newUser);

            res.status(200).json({
                'message': `🤩🎀🎉🏆 User ${user.name} Registered!`
            });
        }
         
    } catch (error) {

        console.log(error);
        return res.status(404).send("⚠ Error");
        
    }

};

const login = async (req, res) => {
    
    try {

        const user = {
            account_type: req.body.account_type,
            email: req.body.email,
            password: req.body.password
        }
        
        // check entries 
        if (!user.email || !user.password || !user.account_type) {
            res.status(404).json({'message': '⚠ Add Fields Required!'});
        }  
        
        // find user
        const userFound = await User.findOne({where: {email: user.email}}); //user present
        
        if (!userFound) return res.sendStatus(401).json({'message': '⚠ Unauthorized!'}) //Unauthorized 
        
        // evaluate password 
        const match = await bcrypt.compare(user.password, userFound.password);
            
        if (match) {

            // create jwt
            const accessToken =  jwt.sign(
                {"user": userFound},
                SECRET_KEY,
                { expiresIn: '9h' }
            );
    
            const refreshToken =  jwt.sign(
                {"name": userFound.name},
                SECRET_KEY,
                { expiresIn: '10h' }
            );

            //saving refreshToken with current user
            // const currentUser = {...userFound, accessToken}

            // console.log(currentUser);
    
            //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 1000});
            //res.json({ refreshToken });
            //res.json({ accessToken });
            res.cookie('jwt', accessToken, { maxAge: 9000000000, httpOnly: true })
            
            userFound.password = "null";
            res.status(200).json({
                'user': userFound,
                'message': `Authorized 🏆 Logged In!`})
        } else {
            res.sendStatus(401);
        };

    } catch (error) {

        console.log(error);
        return res.status(404).send("⚠ Error");
        
    }
}

module.exports = {registerUser, login};
