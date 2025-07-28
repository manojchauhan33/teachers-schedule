const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/school-timetable')  

  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));





//   mongoose.connect('mongodb://localhost:27017/school-timetable', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })