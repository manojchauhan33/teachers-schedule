import User from '../models/user.js';

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const profilePic = req.file ? req.file.filename : null;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.send('User already exists');
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
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
};

export { signup };
