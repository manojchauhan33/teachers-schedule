import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/school-timetable')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));
