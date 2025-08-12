import AdjustmentRequest from '../models/adjustmentRequest.js';
import Timetable from '../models/timetable.js';

export const renderInboxPage = async (req, res) => {
  try {
    console.log('Rendering inbox page...');
    
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).send('Unauthorized');
    }

    const userId = req.session.user.id;
    console.log(userId);

    const adjustments = await AdjustmentRequest.find({ replacementTeacher: userId })
      .populate('lecture')
      .populate('originalTeacher', 'name')
      .populate('replacementTeacher', 'name')
      .lean();

    console.log(`Found ${adjustments.length} adjustment(s) for user.`);

    res.render('inbox', {
      user: req.session.user,
      adjustments
    });
  } catch (err) {
    console.error('Error fetching inbox:', err);
    res.status(500).send('Server Error');
  }
};



export const acceptAdjustment = async (req, res) => {
  try {
    const { id } = req.params;

    const adjustment = await AdjustmentRequest.findById(id)
      .populate('lecture')
      .populate('replacementTeacher');

    if (!adjustment) {
      return res.status(404).json({ error: 'Adjustment request not found' });
    }

    // console.log('adjustmet', adjustment);

    if (!adjustment.lecture) {
      return res.status(400).json({ error: 'Lecture not found in adjustment' });
    }

    // console.log('Updating timetable lecture:', adjustment.lecture._id);

    await Timetable.findByIdAndUpdate(adjustment.lecture._id, {
      teacher: adjustment.replacementTeacher._id || adjustment.replacementTeacher,
      adjustmentStatus: 'Accepted'
    });

    adjustment.status = 'Accepted';
    await adjustment.save();


    res.status(200).json({ message: 'Adjustment accepted successfully.' });
  } catch (error) {
    console.error('Error accepting adjustment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const rejectAdjustment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    
    // console.log(`Reason:`, reason);

    if (!reason) {
      
      return res.status(400).json({ error: 'Rejection reason is required.' });
    }

    const adjustment = await AdjustmentRequest.findById(id);
    if (!adjustment) {
      return res.status(404).json({ error: 'Adjustment request not found.' });
    }

    adjustment.status = 'Rejected';
    adjustment.rejectionReason = reason;
    await adjustment.save();

    await Timetable.findByIdAndUpdate(adjustment.lecture, {
      adjustmentStatus: 'Rejected'
    });

    
    res.status(200).json({ message: 'Adjustment rejected successfully.' });
  } catch (error) {
    console.error('Error rejecting adjustment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

