// import mongoose from 'mongoose';

// const timetableSchema = new mongoose.Schema({

//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   day: String,
//   lecture: String, 
//   subject: String,
//   startTime: String,
//   endTime: String,
//   room: String,
//   status: { type: String, enum: ['Done', 'Left', 'Pending'], default: 'Pending' }
  
// });

// const Timetable = mongoose.model('Timetable', timetableSchema);

// export default Timetable;

import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  teacher: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    },
    
      day: String,
      lecture: String, 
      subject: String,
      startTime: String,
      endTime: String,
      room: String,

  status: {
     type: String, 
     enum: ['Done', 'Left', 'Pending'], 
     default: 'Pending' 
    },

  adjustmentStatus: {
     type: String, 
     enum: ['Requested', 'Accepted', 'Rejected', ''], 
     default: '' 
    } 
});

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;