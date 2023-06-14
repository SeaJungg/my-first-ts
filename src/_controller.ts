import { Request, Response } from 'express';
import { CustomResponse } from './middlewares';
import { 
  createTransaction, 
  getAllTransactions, 
  getTransactionById, 
  updateTransaction, 
  deleteTransaction
} from './services';

export default Object.freeze({
  postTransaction: async (req: Request, res: Response) => {
    try {
      await createTransaction(req);
      res.sendData('Transaction created successfully');
    } catch (error) {
      console.error(error);
      res.sendError(500, 'Error creating transaction');
    }
  },
  getAllTransactions: async (req: Request, res: Response) => {
    try {
      const transactions = await getAllTransactions(req);
      res.sendData(transactions);
    } catch (error) {
      console.error(error);
      res.sendError(500, 'Error retrieving transactions');
    }
  },
  getTransaction: async (req: Request, res: Response) => {
    try {
      const transaction = await getTransactionById(req);
      if (transaction) {
        res.sendData(transaction);
      } else {
        res.sendError(404, 'Transaction not found');
      }
    } catch (error) {
      console.error(error);
      res.sendError(500, 'Error retrieving transaction');
    }
  },
  updateTransaction: async (req: Request, res: Response) => {
    try {
      await updateTransaction(req);
      res.sendData('Transaction updated successfully');
    } catch (error) {
      console.error(error);
      res.sendError(500, 'Error updating transaction');
    }
  },
  deleteTransaction: async (req: Request, res: Response) => {
    try {
      await deleteTransaction(req);
      res.sendData('Transaction deleted successfully');
    } catch (error) {
      console.error(error);
      res.sendError(500, 'Error deleting transaction');
    }
  },
});