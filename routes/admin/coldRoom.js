const  ColdRommController=require('../../controllers/admin/coldRoom.js');
 const router=require('express').Router();

 router.post('/',ColdRommController.create);
 router.get('/',ColdRommController.getAll);
 router.put('/:id',ColdRommController.update);
 router.post('/assign-manager/:coldRoomId',ColdRommController.assignManager);

 module.exports = router;
