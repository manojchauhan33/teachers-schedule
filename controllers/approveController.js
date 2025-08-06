import Leave from '../models/leave.js';
import Timetable from '../models/timetable.js';
import User from '../models/user.js';

export const renderApprovePage = async (req, res) => {
  try {
    const leaveRequests = await Leave.find()
      .populate('teacher')
      .sort({ date: -1 });

   
      
    for (let leave of leaveRequests) {
      if (leave.status === 'Approved') {
        const leaveDate = new Date(leave.date);
        const dayName = leaveDate.toLocaleDateString('en-US', { weekday: 'long' });

        
        
        const lectures = await Timetable.find({
          teacher: leave.teacher._id,
          day: dayName
        });

        
        leave.lectures = lectures;

        
        
        const allTeachers = await User.find({ role: 'teacher' });
        const leavesOnThatDay = await Leave.find({ date: leave.date, status: 'Approved' });

        const teachersOnLeaveIds = leavesOnThatDay.map(l => l.teacher.toString());

        const availableTeachers = allTeachers.filter(t =>
          !teachersOnLeaveIds.includes(t._id.toString())
        );

        leave.availableTeachers = availableTeachers;
      }
    }

    res.render('approveLeave', {
      user: req.session.user,
      leaveRequests
    });
  } catch (err) {
    console.error('Error loading leave requests:', err);
    res.status(500).send('Failed to load leave requests.');
  }
};

export const approveLeave = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error approving leave:', err);
    res.status(500).send('Error approving leave.');
  }
};

export const rejectLeave = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error rejecting leave:', err);
    res.status(500).send('Error rejecting leave.');
  }
};
