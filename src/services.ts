import { JsonDB, Config } from 'node-json-db';
import { Transaction } from './interfaces';

const db = new JsonDB(new Config('./transactionDB', true, false, '/'));

export const createTransaction = ({ id, name, amount }: Transaction): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Input validation
      if (!id || !name || !amount || typeof id !== 'string' || typeof name !== 'string' || typeof amount !== 'number') {
        reject(new Error('Invalid transaction data'));
      }

      db.push(`/transactions/${id}`, { id, name, amount });

      resolve('Transaction created successfully');
    } catch (error) {
      reject(new Error(`Error creating transaction`));
    }
  });
};

export const getAllTransactions = (): Promise<Record<string, Transaction>> => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = db.getData('/transactions');
      resolve(transactions);
    } catch (error) {
      reject(new Error('Error retrieving transactions'));
    }
  });
};

export const getTransactionById = (id: string): Promise<Transaction | null> => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.getData(`/transactions/${id}`);
      resolve(transaction);
    } catch (error) {
      resolve(null); // Return null if transaction is not found
    }
  });
};

export const updateTransaction = ({ id, name, amount }: Transaction): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Input validation
      if (!id || !name || !amount || typeof id !== 'string' || typeof name !== 'string' || typeof amount !== 'number') {
        throw new Error('Invalid transaction data');
      }

      db.push(`/transactions/${id}`, { id, name, amount }, false); // Set overwrite to false

      resolve('Transaction updated successfully');
    } catch (error) {
      reject(new Error('Error updating transaction'));
    }
  });
};

export const deleteTransaction = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      db.delete(`/transactions/${id}`);

      resolve('Transaction deleted successfully');
    } catch (error) {
      reject(new Error('Error deleting transaction'));
    }
  });
};
