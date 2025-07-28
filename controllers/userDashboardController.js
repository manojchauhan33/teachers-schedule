const Timetable = require('../models/timetable');
const User = require('../models/user');

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
    console.error('Error rendering dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {renderDashboardPage};
