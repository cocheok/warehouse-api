/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/inventory';
const router = express.Router();

router.get('/', controller.getInventories);
router.get('/:art_id', controller.getInventory);
router.put('/:art_id', controller.updateInventory);
router.delete('/:art_id', controller.deleteInventory);
router.post('/', controller.addInventory);

export = router;