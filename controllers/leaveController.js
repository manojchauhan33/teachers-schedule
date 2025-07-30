import Leave from '../models/leave.js';

const renderLeaveForm = async (req, res) => {
  try {
    const teacherId = req.session.user.id;
    const leaves = await Leave.find({ teacher: teacherId }).sort({ date: -1 });


    res.render('leave', {
      success: req.session.success,
      error: req.session.error,
      leaveHistory: leaves
    });


    
    
    req.session.success = null;
    req.session.error = null;

    
  } catch (error) {
    console.error('Error rendering leave page:', error);
    res.status(500).send('Server Error');
  }
};

const submitLeaveForm = async (req, res) => {
  try {
    const { date, reason } = req.body;
    const teacherId = req.session.user.id;

    const existing = await Leave.findOne({ teacher: teacherId, date });

    if (existing) {
      req.session.error = 'You already applied leave for this date.';
      return res.redirect('/leave');
    }

    const leave = new Leave({
      teacher: teacherId,
      date,
      reason,
    });

    await leave.save();

    req.session.success = 'Leave applied successfully.';
    res.redirect('/leave');

  } catch (error) {
    console.error('Error submitting leave form:', error);
    req.session.error = 'Something went wrong.';
    res.redirect('/leave');
  }
};

export { renderLeaveForm, submitLeaveForm };
