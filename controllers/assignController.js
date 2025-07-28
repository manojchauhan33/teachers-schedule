const Timetable = require('../models/timetable');
const User = require('../models/user');



async function renderAssignTimetable(req, res) {
  try {
    const teacherId = req.query.teacherId;
    const teacher = await User.findById(teacherId);
    res.render('assignTimetable', { teacher });
  } 
  catch (error) {
    console.error('Error rendering assign timetable:', error);
    res.status(500).send('Error loading form');
  }
}



async function saveTimetable(req, res) {
  try {
    const { teacherId, day, lecture, subject, startTime, endTime, room } = req.body;

    
    await Timetable.deleteOne({ teacher: teacherId, day, lecture });

    
    const newEntry = new Timetable({
      teacher: teacherId,
      day,
      lecture,
      subject,
      startTime,
      endTime,
      room
    });

    await newEntry.save();
    res.redirect(`/admin?teacherId=${teacherId}`);

  } catch (error) {
    console.error('Error saving timetable:', error);
    res.status(500).send('Failed to save timetable');

  }
}



async function deleteLecture(req, res) {
  try {
    const { teacherId, day, lecture } = req.body;

    await Timetable.deleteOne({ teacher: teacherId, day, lecture });

    res.redirect(`/admin?teacherId=${teacherId}`);
  } catch (error) {
    console.error('Error deleting lecture:', error);
    res.status(500).send('Failed to delete lecture');
  }
}




module.exports = {renderAssignTimetable,saveTimetable,deleteLecture};

