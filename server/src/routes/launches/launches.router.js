import express from 'express';
import * as launchesController from './launches.controller.js'; 

const router = express.Router();

router.get('/launches',launchesController.getAllLaunches);
router.post('/launches',launchesController.addNewLaunch);
export default router;