import Leave from '../models/leave.js';

export const renderLeaveForm = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  res.render('leave', {
    user: req.session.user,
    successMessage: null,
    errorMessage: null
  });
};

export const submitLeave = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/login');

    const { date, reason } = req.body;
    const teacherId = req.session.user.id;


    console.log(req.body);
    console.log("Submitting leave for teacher:", teacherId);


    if (!date || !reason || !teacherId) {
      return res.render('leave', {
        user: req.session.user,
        successMessage: null,
        errorMessage: 'Please fill all fields.'
      });
    }

    const leave = new Leave({
      teacher: teacherId,
      date,
      reason,
      status: 'Pending'
    });

    await leave.save();

    res.render('leave', {
      user: req.session.user,
      successMessage: 'Leave submitted successfully!',
      errorMessage: null
    });
  } catch (error) {
    console.error("Error submitting leave:", error);

    res.status(500).render('leave', {
      user: req.session.user || null,
      successMessage: null,
      errorMessage: 'Something went wrong while submitting leave.'
    });
  }
};
