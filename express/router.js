const { Router } = require('express');
  
// Local Modules
const myController = require('./controller');
  
// Initialization
const router = Router();
  
// Requests 
router.get('/getUser', myController.getUser);
router.post('/addUser', myController.addUser);
router.put('/editUser', myController.editUser);
router.delete('/deleteUser', myController.deleteUser);
  
module.exports = router;