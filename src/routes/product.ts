/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/product';
const router = express.Router();

router.get('/', controller.getProductsAndAvailableQuantity);
router.post('/:id/sell', controller.sellProduct);

router.get('/:id', controller.getProduct);
router.post('/', controller.addProduct);
router.post('/:id/inventory', controller.addInventory);

export = router;