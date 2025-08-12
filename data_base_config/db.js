import mongoose, { connect } from 'mongoose';


// mongoose.connect('mongodb://localhost:27017/school-timetable', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });




mongoose.connect('mongodb://127.0.0.1:27017/school-timetable')    //ip adress and with port number of mongo db
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));
