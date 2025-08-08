import User from '../models/user.js';

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.send('Invalid email or password');
    }

    //console.log(req.body);

    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role,
      profilePic: user.profilePic
    };
    



    if (user.role === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/user');
    }

    

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).send('error');
  }
};  

export default loginController;
