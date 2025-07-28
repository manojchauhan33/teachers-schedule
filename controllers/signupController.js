const User = require('../models/user');


const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const profilePic = req.file ? req.file.filename : null;



  try {

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.send('user already exists');
    }



    const newUser = new User({
      name,
      email,
      password,
      role,
      profilePic
    });


    await newUser.save();

    res.redirect('/login');

  } catch (err) {
    console.error('error:', err);
    res.status(500).send('Something went wrong');           //Internal Server Error ststus(500)
  }
};




module.exports = { signup };
