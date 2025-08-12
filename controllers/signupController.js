import User from '../models/user.js';
import bcrypt  from 'bcrypt';


const signup = async (req, res) => {
  const { name, email, password, role } = req.body;    //object distructuring
  // console.log(req.body);
  const profilePic = req.file ? req.file.filename : null;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.send('User already exists');
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profilePic
    });

    
    // console.log(newUser);


    await newUser.save();

    res.redirect('/login');

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');     //status 500 means somthing went wrong in server
  }
};


export { signup };
