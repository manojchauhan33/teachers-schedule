import bcrypt from 'bcrypt';
import User from '../models/user.js';
import crypto from 'crypto';


export const renderResetForm = async (req, res) => {
    
    try {
        const token = req.params.token;

 
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.send('Invalid or expired token.');
        }

        res.render('resetPassword', { token });

        } catch (err) {
            console.error(err);
            res.send('Server error.');
        }
};


export const updatePassword = async (req, res) => {
    
    try {
        const token = req.params.token;


        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.send('Invalid or expired token.');
        }
         const { password } = req.body;

        
        
         
        const hashedPassword = await bcrypt.hash(password, 10);

        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        
        
        // res.send('Password updated successfully! You can now log in.');

  res.render('login'); 
    } catch (err) {
        console.error(err);
        res.send('Server error.');
    }
};


