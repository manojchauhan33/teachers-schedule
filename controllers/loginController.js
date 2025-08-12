import User from '../models/user.js';
import bcrypt from 'bcrypt';

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send('Invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.status(400).send('Invalid Password');
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
