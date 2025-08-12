import Timetable from '../models/timetable.js';
import User from '../models/user.js';

async function renderUserDashboard(req, res) {
  try {
    const userId = req.session.user.id;

    const user = await User.findById(userId);
    const timetable = await Timetable.find({ teacher: userId });

    // console.log(user);
    // console.log(timetable);


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


async function updateLectureStatus(req, res) {
  try {
    const { timetableId, status } = req.body;

    // console.log(req.body);

    if (!timetableId || !status) {
      return res.status(400).json({ success: false, message: 'Missing data' });
    }

    const updated = await Timetable.findByIdAndUpdate(timetableId, { status });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Lecture not found' });
    }

    res.json({ success: true, message: 'Status updated successfully' });

  } catch (error) {
    console.error('Error updating lecture status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// console.log(req.body);

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/');
    }
    res.redirect('/login');
  });
}



export { renderUserDashboard, updateLectureStatus, logoutUser };
