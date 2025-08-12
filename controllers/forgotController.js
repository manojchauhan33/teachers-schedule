import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';


export const renderForgotPassword = (req, res) => {
  res.render('forgotPassword');
};



export const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('No account found with that email.');
    }

   
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 15 * 60 * 1000; 


                    //crypto.randomBytes(32) ->
                    // generates 32 random bytes not characters
                    // a byte is 8 bits so 32 bytes = 256 bits of random data
                    // the result is a buffer object binary data

                    // .toString('hex') ->
                    // converts the binary buffer into a human-readable hexadecimal string
                    // each byte becomes 2 hex characters
                    // so 32 bytes  64 hex characters

    


    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();

    
    


    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    //resetURL = "https://localhot/reset-password/token"


  
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, '')                                // remove spaces
      }
    });

  
    

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Link',
      html: `
        <h3>Password Reset</h3>
        <p>You requested a password reset. Click below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link will expire in 15 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);


    res.send('link sent check email where we send link with token .');

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};
