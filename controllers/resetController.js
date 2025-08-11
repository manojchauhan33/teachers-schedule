// import bcrypt from 'bcrypt';
// import User from '../models/user.js';
// import crypto from 'crypto';

// // GET /reset-password/:token
// export const renderResetForm = async (req, res) => {
//     const token = req.params.token;
//     try {
//         // Find user with this token and check expiry
//         const user = await User.findOne({
//             resetToken: token,
//             resetTokenExpiry: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.send('Invalid or expired token.');
//         }

//         res.render('resetPassword', { token });
//     } catch (err) {
//         console.error(err);
//         res.send('Server error.');
//     }
// };

// // POST /reset-password/:token
// export const updatePassword = async (req, res) => {
//     const token = req.params.token;
//     const { password } = req.body;

//     try {
//         // Find user with this token and check expiry
//         const user = await User.findOne({
//             resetToken: token,
//             resetTokenExpiry: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.send('Invalid or expired token.');
//         }

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save new password & clear token fields
//         user.password = hashedPassword;
//         user.resetToken = undefined;
//         user.resetTokenExpiry = undefined;
//         await user.save();

//         res.send('Password updated successfully! You can now log in.');
//     } catch (err) {
//         console.error(err);
//         res.send('Server error.');
//     }
// };
