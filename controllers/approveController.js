import Leave from '../models/leave.js';
import Timetable from '../models/timetable.js';
import User from '../models/user.js';
import AdjustmentRequest from '../models/adjustmentRequest.js';

const renderApprovePage = async (req, res) => {
  try {
    const leaveRequests = await Leave.find()
      .populate('teacher')
      .sort({ date: -1 });        //-1 means descending order (latest dates first)    //If it was 1 it would be ascending (oldest first).



    for (let leave of leaveRequests) {
      if (leave.status === 'Approved') {
        const leaveDate = new Date(leave.date);
        const dayName = leaveDate.toLocaleDateString('en-US', { weekday: 'long' });

        // console.log(leaveDate);
        // console.log(dayName);

        const lectures = await Timetable.find({
          teacher: leave.teacher._id,
          day: dayName
        });


        // console.log(lectures);


        
        const adjustmentRequests = await AdjustmentRequest.find({
          lecture: { $in: lectures.map(l => l._id) },
          status: 'Requested'
        }).populate('replacementTeacher');


        
        for (let lecture of lectures) {
          const adj = adjustmentRequests.find(ar => ar.lecture.toString() === lecture._id.toString());
          if (adj) {
            lecture.adjustmentRequest = adj;
          }
        }

        leave.lectures = lectures;

        const allTeachers = await User.find({ role: 'user' });

        const leavesOnThatDay = await Leave.find({
          date: {
            $gte: new Date(leave.date.setHours(0, 0, 0, 0)),
            $lte: new Date(leave.date.setHours(23, 59, 59, 999))
          },
          status: 'Approved'
        });


        const teachersOnLeaveIds = leavesOnThatDay.map(l => l.teacher.toString());

        const availableTeachers = allTeachers.filter(t =>
          !teachersOnLeaveIds.includes(t._id.toString())
        );

        //console.log(availableTeachers);
        leave.availableTeachers = availableTeachers;
      }
    }

    res.render('approveLeave', {        // render from here 
      user: req.session.user,
      leaveRequests
    });

    //console.log(leaveRequests)

  } catch (err) {
    console.error('Error loading leave requests:', err);
    res.status(500).send('Failed to load leave requests.');
  }
};

const approveLeave = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error approving leave:', err);
    res.status(500).send('Error approving leave.');
  }
};

const rejectLeave = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error rejecting leave:', err);
    res.status(500).send('Error rejecting leave.');
  }
};

export { renderApprovePage, approveLeave, rejectLeave };
