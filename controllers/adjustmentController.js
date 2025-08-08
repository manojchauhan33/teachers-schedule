// import AdjustmentRequest from '../models/adjustmentRequest.js';
// import Timetable from '../models/timetable.js';
// import User from '../models/user.js';
// import Leave from '../models/leave.js';

// export const getAdjustmentOptions = async (req, res) => {
//   try {
//     const leaveId = req.params.leaveId;
//     const leave = await Leave.findById(leaveId).populate('teacher');
//     console.log(leave);

//     if (!leave) return res.status(404).send('Leave not found');

//     const leaveDate = new Date(leave.date);
//     const dayName = leaveDate.toLocaleString('en-US', { weekday: 'long' });

//     console.log(leaveDate);
//     console.log(dayName);

//     const lectures = await Timetable.find({
//       teacher: leave.teacher._id,
//       day: { $regex: new RegExp(`^${dayName}$`, 'i') }
//     }).populate('subject');

//     const leaveDateStart = new Date(leave.date);
//     leaveDateStart.setHours(0, 0, 0, 0);

//     const leaveDateEnd = new Date(leave.date);
//     leaveDateEnd.setHours(23, 59, 59, 999);

//     const sameDayLeaves = await Leave.find({
//       date: { $gte: leaveDateStart, $lte: leaveDateEnd }
//     });

//     const onLeaveTeacherIds = sameDayLeaves.map(l => l.teacher.toString());

//     const availableTeachers = await User.find({
//       _id: { $nin: onLeaveTeacherIds },
//       role: 'user' // <== YOUR TEACHER ROLE
//     });
    
    

//     res.render('approveLeave', { leave, lectures, availableTeachers });

//   } catch (err) {
//     console.error('Error in getAdjustmentOptions:', err);
//     res.status(500).send('Server error');
//   }
// };

// export const sendAdjustmentRequest = async (req, res) => {
//   try {
//     const { lectureId, originalTeacherId, replacementTeacherId } = req.body;
//     console.log(req.body);

//     if (!lectureId || !originalTeacherId || !replacementTeacherId) {
//       return res.redirect('/approveLeave');
//     }

//     const existingRequest = await AdjustmentRequest.findOne({
//       lecture: lectureId
//     });

//     if (existingRequest) {
//       console.log('Request already exists');
//       return res.redirect('/approveLeave');
//     }

//     const newRequest = new AdjustmentRequest({
//       lecture: lectureId,
//       originalTeacher: originalTeacherId,
//       replacementTeacher: replacementTeacherId,
//       status: 'Pending'
//     });

//     await newRequest.save();
//     console.log('Adjustment request sent');
//     return res.redirect('/approveLeave');

//   } catch (err) {
//     console.error('Error in sendAdjustmentRequest:', err);
//     return res.redirect('/approveLeave');
//   }
// };

// export const acceptAdjustment = async (req, res) => {
//   try {
//     const { requestId } = req.params;

//     const request = await AdjustmentRequest.findById(requestId);
//     if (!request) return res.status(404).send('Request not found');

//     if (request.status !== 'Pending') {
//       return res.status(400).send('Only pending requests can be accepted');
//     }

//     await Timetable.findByIdAndUpdate(request.lecture, {
//       teacher: request.replacementTeacher
//     });

//     request.status = 'Accepted';
//     await request.save();

//     return res.redirect('/inbox');

//   } catch (err) {
//     console.error('Error in acceptAdjustment:', err);
//     return res.redirect('/inbox');
//   }
// };

// export const rejectAdjustment = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const { reason } = req.body;

//     if (!reason) return res.redirect('/inbox');

//     const request = await AdjustmentRequest.findById(requestId);
//     if (!request) return res.status(404).send('Request not found');

//     if (request.status !== 'Pending') {
//       return res.status(400).send('Only pending requests can be rejected');
//     }

//     request.status = 'Rejected';
//     request.rejectionReason = reason;
//     await request.save();

//     return res.redirect('/inbox');

//   } catch (err) {
//     console.error('Error in rejectAdjustment:', err);
//     return res.redirect('/inbox');
//   }
// };
