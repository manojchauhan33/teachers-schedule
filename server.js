import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';



import './data_base_config/db.js';

import signupRoutes from './routes/signupRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import assignRoutes from './routes/assignRoutes.js';
import userRoutes from './routes/userRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import approveLeaveRoutes from './routes/approveLeaveRoutes.js';
import userDashboardRoutes from './routes/userDashboardRoutes.js';
import calenderRoute from './routes/calenderRoute.js';
import inboxRoute from './routes/inboxRoutes.js';
import forgotRoute from './routes/forgotRoute.js';
import resetRoutes from './routes/resetRoutes.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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




app.get('/', (req, res) => res.redirect('/login'));


app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/assign-timetable', assignRoutes);
app.use('/user', userRoutes);
app.use('/logout', logoutRoutes);
app.use('/dashboard', userDashboardRoutes);
app.use('/leave', leaveRoutes);
app.use('/approveLeave', approveLeaveRoutes);
app.use('/celender', calenderRoute);
app.use('/inbox',inboxRoute);
app.use('/forgot',forgotRoute);
app.use('/', resetRoutes);





app.listen(3000, () => {
  console.log('Server running');
});
