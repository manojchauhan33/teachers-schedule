const Timetable = require('../models/timetable');
const User = require('../models/user');

async function renderUserDashboard(req, res) {
  try {
    const userId = req.session.user.id;

    const user = await User.findById(userId);
    const timetable = await Timetable.find({ teacher: userId });

    res.render('user', {
      user: {
        name: user.name,
        profilePic: user.profilePic
      },
      timetable
    });

  } catch (error) {
    console.error('Error loading user dashboard:', error);
    res.status(500).send('Something went wrong');
  }
}

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/');
    }
    res.redirect('/login');
  });
}


module.exports = {renderUserDashboard,logoutUser};
