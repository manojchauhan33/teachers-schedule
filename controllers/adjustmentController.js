import AdjustmentRequest from '../models/adjustmentRequest.js';
import Timetable from '../models/timetable.js';


export const sendAdjustment = async (req, res) => {
  try {
    const { lectureId, replacementTeacherId, leaveDate, originalTeacherId } = req.body;

    if (!lectureId || !replacementTeacherId || !leaveDate || !originalTeacherId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const lecture = await Timetable.findById(lectureId).populate('teacher');
    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found.' });
    }

    const adjustment = new AdjustmentRequest({
      lecture: lecture._id,
      originalTeacher: originalTeacherId,
      replacementTeacher: replacementTeacherId,
      date: new Date(leaveDate),
      status: 'Requested'
    });

    //console.log(adjustment) 

    await adjustment.save();

    await Timetable.findByIdAndUpdate(lectureId, { adjustmentStatus: 'Requested' });


    const populatedAdjustment = await AdjustmentRequest.findById(adjustment._id).populate('replacementTeacher');

    console.log(`adjustment request saved and timetable updated for Lecture ID: ${lectureId}`);

    res.status(200).json({ adjustment: populatedAdjustment });
  } catch (error) {
    console.error('Error sending adjustment request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






