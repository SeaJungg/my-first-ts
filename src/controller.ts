import { Request, Response } from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from './services';

export default {
  postTransaction: async (req: Request, res: Response) => {
    try {
      const { id, name, amount } = req.body;
      await createTransaction({ id, name, amount });
      res.status(200).json({ message: 'Transaction created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating transaction' });
    }
  },
  getAllTransactions: async (_: Request, res: Response) => {
    try {
      const transactions = await getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving transactions' });
    }
  },
  getTransaction: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const transaction = await getTransactionById(id);
      if (transaction) {
        res.status(200).json(transaction);
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving transaction' });
    }
  },
  updateTransaction: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, amount } = req.body;
      await updateTransaction({ id, name, amount });
      res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating transaction' });
    }
  },
  deleteTransaction: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await deleteTransaction(id);
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting transaction' });
    }
  },
};
