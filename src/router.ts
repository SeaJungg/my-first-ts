import express from 'express';
import controller from './controller';

const router = express.Router();

router.route('/transactions')
  .post(controller.postTransaction)
  .get(controller.getAllTransactions);

router.route('/transactions/:id')
  .get(controller.getTransaction)
  .put(controller.updateTransaction)
  .delete(controller.deleteTransaction);

export default router;
