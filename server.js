import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import './data_base_config/db.js';

import signupRoutes from './routes/signupRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import assignRoutes from './routes/assignRoutes.js';
import userRoutes from './routes/userRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import approveLeaveRoutes from './routes/approveLeave.js';
import userDashboardRoutes from './routes/userDashboardRoutes.js';

const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__dirname);       //full path of current file 
// console.log(__filename);      //folder path of current file 

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
app.use('/userDashboard', userDashboardRoutes);




app.listen(3000, () => {
  console.log('Server running');
});

