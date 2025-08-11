// import crypto from 'crypto';
// import nodemailer from 'nodemailer';
// import User from '../models/user.js'; // your mongoose user model

// // Show forgot password page
// export const renderForgotPassword = (req, res) => {
//   res.render('forgotPassword');
// };

// // Handle forgot password form
// export const sendResetLink = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // 1. Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('No account found with that email.');
//     }

//     // 2. Create reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 mins

//     // 3. Save token to DB
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpire = resetTokenExpire;
//     await user.save();

//     // 4. Create reset URL
//     const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

  
    
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS.replace(/\s/g, '') // remove spaces
//       }
//     });

  
    
//     const mailOptions = {
//       from: `"Your App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Password Reset Link',
//       html: `
//         <h3>Password Reset</h3>
//         <p>You requested a password reset. Click below to reset your password:</p>
//         <a href="${resetURL}">${resetURL}</a>
//         <p>This link will expire in 15 minutes.</p>
//       `
//     };

//     await transporter.sendMail(mailOptions);

//     res.send('Reset link sent to your email.');

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error.');
//   }
// };
