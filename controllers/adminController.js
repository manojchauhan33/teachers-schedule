import User from '../models/user.js';
import Timetable from '../models/timetable.js';

async function renderAdminDashboard(req, res) {
  try {
    const teachers = await User.find({ role: 'user' });

    const selectedTeacherId = req.query.teacherId || (teachers[0] && teachers[0]._id);

    let timetableData = [];

    if (selectedTeacherId) {
      timetableData = await Timetable.find({ teacher: selectedTeacherId });
    }


    res.render('admin', {
      user: req.session.user,
      teachers,
      timetableData,
      selectedTeacherId
    });


  } catch (error) {
    console.error('Error rendering admin dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
}


export { renderAdminDashboard };