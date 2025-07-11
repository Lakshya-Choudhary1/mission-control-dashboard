import express from 'express';
import * as launchesController from './launches.controller.js'; 

const router = express.Router();

router.get('/',launchesController.getAllLaunches);
router.post('/',launchesController.addNewLaunch);
router.delete('/:id',launchesController.deleteLaunch);
export default router;