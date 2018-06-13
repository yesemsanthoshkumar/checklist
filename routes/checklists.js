const express = require('express');
const router = express.Router();

const service = require('../services/checklists');

router.get('/', service.getAllChecklists);
router.get('/:checklist/', service.getCheckList);
router.post('/add', service.AddCheckList);
router.delete('/:checklist/delete', service.DeleteCheckList);
router.put('/:checklist/update', service.UpdateCheckList);
router.post('/itsTasksTime', service.ItsTasksTime);

module.exports = router;
