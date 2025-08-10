import AdjustmentRequest from '../models/adjustmentRequest.js';

export const renderInboxPage = async (req, res) => {
  try {
    // Check login
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).send('Unauthorized');
    }

    const userId = req.session.user.id; // Session se id le rahe hain

    // Find all adjustment requests where this user is the replacement teacher
    const adjustments = await AdjustmentRequest.find({ replacementTeacher: userId })
      .populate('lecture') // Lecture details
      .populate('originalTeacher', 'name') // Original teacher name only
      .populate('replacementTeacher', 'name') // Replacement teacher name only
      .lean();

    // Render EJS page with data
    res.render('inbox', {
      user: req.session.user,
      adjustments
    });
  } catch (err) {
    console.error('Error fetching inbox:', err);
    res.status(500).send('Server Error');
  }
};
