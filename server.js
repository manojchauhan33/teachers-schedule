const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');



const app = express();



require('./data_base_config/db');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');
const assignRoutes = require('./routes/assignRoutes');
const userRoutes = require('./routes/userRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const approveLeaveRoutes = require('./routes/approveLeave');




app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100mb',
  parameterLimit: 10000
}));




app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(session({
  secret: '234567udsxcvbjfyujhvvn',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));



app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));




app.get('/', (req, res) => res.redirect('/signup'));



app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/assign-timetable', assignRoutes);
app.use('/user', userRoutes);
app.use('/logout', logoutRoutes);
app.use('/leave', leaveRoutes);
app.use('/approveLeave', approveLeaveRoutes);






app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});


//arnav sir 