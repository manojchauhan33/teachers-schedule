import Leave from '../models/leave.js';
import Timetable from '../models/timetable.js';

const renderLeaveForm = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const teacherId = req.session.user.id;
    const leaveRequests = await Leave.find({ teacher: teacherId }).sort({ date: 1 });

    //console.log(leaveRequests);


    let lectures = [];

    if (leaveRequests.length > 0) {
      const today = new Date();
      const upcomingLeave = leaveRequests.find(lr =>
        new Date(lr.date).toDateString() >= today.toDateString()
      );

      if (upcomingLeave) {
        const dayName = new Date(upcomingLeave.date).toLocaleString('en-US', { weekday: 'long' });

        lectures = await Timetable.find({
          teacher: teacherId,
          day: dayName
        });
      }
    }

    
    res.render('leave', {
      user: req.session.user,
      successMessage: null,
      errorMessage: null,
      leaveRequests,
      lectures
    });



  } catch (err) {
    console.error("Error fetching leaves:", err);
    res.render('leave', {
      user: req.session.user,
      successMessage: null,
      errorMessage: 'Something went wrong while loading leave requests.',
      leaveRequests: [],
      lectures: []
    });
  }
};



const submitLeave = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const { date, reason } = req.body;
  const teacherId = req.session.user.id;

  try {
    const leaveRequests = await Leave.find({ teacher: teacherId }).sort({ date: 1 });

    if (!date || !reason) {
      return res.render('leave', {
        user: req.session.user,
        successMessage: null,
        errorMessage: 'Please fill all fields.',
        leaveRequests,
        lectures: []
      });
    }




    const existingLeave = await Leave.findOne({ teacher: teacherId, date });
    if (existingLeave) {
      return res.render('leave', {
        user: req.session.user,
        successMessage: null,
        errorMessage: 'Leave already applied for this date.',
        leaveRequests,
        lectures: []
      });
    }




    const newLeave = new Leave({
      teacher: teacherId,
      date,
      reason,
      status: 'Pending'
    });
    await newLeave.save();

    const leaveDate = new Date(date);
    const dayName = leaveDate.toLocaleString('en-US', { weekday: 'long' });

    const lectures = await Timetable.find({
      teacher: teacherId,
      day: dayName
    });

    const updatedLeaves = await Leave.find({ teacher: teacherId }).sort({ date: 1 });

    res.render('leave', {
      user: req.session.user,
      successMessage: 'Leave submitted successfully!',
      errorMessage: null,
      leaveRequests: updatedLeaves,
      lectures
    });




  } catch (error) {
    console.error("Error submitting leave:", error);
    
    res.status(500).render('leave', {
      user: req.session.user || null,
      successMessage: null,
      errorMessage: 'Something went wrong while submitting leave.',
      leaveRequests: [],
      lectures: []
    });
  }
};




const deleteLeaveRequest = async (req, res) => {
  const leaveId = req.params.id;
  const teacherId = req.session.user?.id;

  try {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).send("Leave not found");
    }

    const isOwner = leave.teacher.toString() === teacherId;
    const isAllowed = leave.status === 'Pending' || leave.status === 'Rejected' || leave.status === 'Approved';

    if (!isOwner || !isAllowed) {
      return res.status(403).send("You can only delete your pending or rejected leave requests");
    }

    await Leave.findByIdAndDelete(leaveId);
    res.redirect('/leave');
  } catch (err) {
    console.error("Error deleting leave:", err);
    res.status(500).send("Error deleting leave");
  }
};


export { renderLeaveForm, submitLeave, deleteLeaveRequest };
