import Leave from '../models/leave.js';
import Adjustment from '../models/adjustment.js';
import User from '../models/user.js';

const renderApprovePage = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate('teacher');
    const adjustments = await Adjustment.find().populate('teacher').populate('leaveId');

    res.render('approveLeave', {
      user: req.session.user,
      leaveRequests,
      adjustments
    });
  } catch (error) {
    console.error('Error rendering approve leave page:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;
    await Leave.findByIdAndUpdate(leaveId, { status });
    res.redirect('/approveLeave');
  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).send('Error updating leave status');
  }
};

const updateAdjustmentStatus = async (req, res) => {
  try {
    const { adjustmentId } = req.body;
    await Adjustment.findByIdAndUpdate(adjustmentId, { status: 'Adjusted' });
    res.redirect('/approveLeave');
  } catch (error) {
    console.error('Error updating adjustment:', error);
    res.status(500).send('Error updating adjustment');
  }
};

const deleteLeave = async (req, res) => {
  try {
    const { leaveId } = req.body;

    // Delete all related adjustments
    await Adjustment.deleteMany({ leaveId });

    // Delete the leave request itself
    await Leave.findByIdAndDelete(leaveId);

    res.redirect('/approveLeave');
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).send('Error deleting leave');
  }
};

const deleteAdjustment = async (req, res) => {
  try {
    const { adjustmentId } = req.body;
    await Adjustment.findByIdAndDelete(adjustmentId);
    res.redirect('/approveLeave');
  } catch (error) {
    console.error('Error deleting adjustment:', error);
    res.status(500).send('Error deleting adjustment');
  }
};

export {
  renderApprovePage,
  updateLeaveStatus,
  updateAdjustmentStatus,
  deleteLeave,
  deleteAdjustment
};
