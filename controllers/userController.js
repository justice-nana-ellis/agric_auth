require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../config/db');
const User = require('../models/userModel');

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
        


    } catch (error) {

        console.log(error);
        return res.status(404).send("⚠ Error");
        
    }
}

module.exports = {registerUser, login};
