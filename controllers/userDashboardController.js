import Timetable from '../models/timetable.js';
import User from '../models/user.js';

async function renderDashboardPage(req, res) {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    const timetable = await Timetable.find({ teacher: userId });

    const totalLectures = timetable.length;
    const totalDone = timetable.filter(t => t.status === 'Done').length;
    const totalLeft = timetable.filter(t => t.status === 'Left').length;


    res.render('dashboard', {
      user: {
        name: user.name
      },
      totalLectures,
      totalDone,
      totalLeft
    });



  } catch (error) {
    console.error('Error:', error);
  }
}

export { renderDashboardPage };
