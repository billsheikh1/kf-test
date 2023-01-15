import express from 'express';
import OutageController from './controllers/OutageController';

const router = express.Router();
router.use((req, res, next) => {
    next();
});

router.get('/', OutageController);
export default router;