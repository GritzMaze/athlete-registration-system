import cors from 'cors';
import { Router } from 'express';
import {
  LogLevel,
  logRequest,
  requestLogLevel
} from '../middlewares/requestLogging';
import notFound from './notFound';
import auth from '../middlewares/auth';
import login from './login';
import register from './register';
import rateLimit from '../middlewares/rateLimit';
import events from './events';
import registrations from './registrations';
import documents from './documents';

const router = Router();
const requestsPerMinute = 60;

router.use(cors());

router.use(requestLogLevel(LogLevel.info), logRequest);

router.use(rateLimit(requestsPerMinute));

router.use('/login', login);
router.use('/register', register);

router.use(notFound);
router.use(auth);

router.use('/events', events);
router.use('/registrations', registrations);
router.use('/documents', documents);

export default router;
