import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from './services';
import { Transaction } from './interfaces';

import {expect, jest} from '@jest/globals';

// Mocking the JsonDB instance
jest.mock('node-json-db', () => {
  return {
    JsonDB: jest.fn().mockImplementation(() => ({
      push: jest.fn(),
      getData: jest.fn(),
      delete: jest.fn(),
    })),
    Config: jest.fn(),
  };
});

describe('Service Tests', () => {
  // Mock transaction data
  const transaction = {
    id: '1',
    name: 'Test Transaction',
    amount: 100,
  };

  // Mock JsonDB instance
  const mockDbPush = jest.fn();
  const mockDbGetData = jest.fn();
  const mockDbDelete = jest.fn();

  beforeEach(() => {
    // Reset mock function calls before each test
    jest.clearAllMocks();

    // Mock the behavior of the JsonDB instance methods
    jest.mock('node-json-db', () => {
      return {
        JsonDB: jest.fn().mockImplementation(() => ({
          push: mockDbPush,
          getData: mockDbGetData,
          delete: mockDbDelete,
        })),
        Config: jest.fn(),
      };
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction and resolve with success message', async () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Transaction 1',
        amount: 100,
      };

      // Call the function
      expect(createTransaction(transaction)).toBe('Transaction created successfully');
    });

    /*
    it('should reject with an error message when an error occurs', async () => {
      // Mocking a scenario where an error occurs within the function
      jest.spyOn(mockDbPush, 'push').mockImplementationOnce(() => {
        throw new Error('Some error occurred');
      });
    
      await expect(createTransaction(transaction)).rejects.toThrow('Error creating transaction');
    });
    */

    it('should reject with an error message when transaction data is invalid', async () => {
      const invalidTransaction = { ...transaction, amount: 'invalid' };

      await expect(createTransaction(invalidTransaction as any)).rejects.toThrow('Invalid transaction data');
    });
  });

  describe('getAllTransactions', () => {
    it('should retrieve all transactions and resolve with the result', async () => {
      const transactions = {
        '1': { id: '1', name: 'Transaction 1', amount: 100 },
        '2': { id: '2', name: 'Transaction 2', amount: 200 },
      };
      mockDbGetData.mockReturnValueOnce(transactions);

      const result = await getAllTransactions();

      expect(mockDbGetData).toHaveBeenCalledWith('/transactions');
      expect(result).toEqual(transactions);
    });

    it('should reject with an error message when an error occurs', async () => {
      mockDbGetData.mockImplementationOnce(() => {
        throw new Error('Some error');
      });

      await expect(getAllTransactions()).rejects.toThrow('Error retrieving transactions');
    });
  });

  describe('getTransactionById', () => {
    it('should retrieve a transaction by ID and resolve with the result', async () => {
      mockDbGetData.mockReturnValueOnce(transaction);

      const result = await getTransactionById(transaction.id);

      expect(mockDbGetData).toHaveBeenCalledWith(`/transactions/${transaction.id}`);
      expect(result).toEqual(transaction);
    });

    it('should resolve with null when the transaction is not found', async () => {
      mockDbGetData.mockImplementationOnce(() => {
        throw new Error('Some error');
      });

      const result = await getTransactionById('non-existent-id');

      expect(mockDbGetData).toHaveBeenCalledWith('/transactions/non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('updateTransaction', () => {
    it('should update a transaction and resolve with success message', async () => {
      mockDbPush.mockImplementationOnce(() => {});

      const result = await updateTransaction(transaction);

      expect(mockDbPush).toHaveBeenCalledWith(`/transactions/${transaction.id}`, transaction, false);
      expect(result).toBe('Transaction updated successfully');
    });

    it('should reject with an error message when an error occurs', async () => {
      mockDbPush.mockImplementationOnce(() => {
        throw new Error('Some error');
      });

      await expect(updateTransaction(transaction)).rejects.toThrow('Error updating transaction');
    });

    it('should reject with an error message when transaction data is invalid', async () => {
      const invalidTransaction = {
        id: '1',
        name: 'Invalid Transaction',
        amount: 'Invalid Amount',
      };
  
      await expect(createTransaction(invalidTransaction as any)).rejects.toThrowError('Invalid transaction data');
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction and resolve with success message', async () => {
      mockDbDelete.mockImplementationOnce(() => {});

      const result = await deleteTransaction(transaction.id);

      expect(mockDbDelete).toHaveBeenCalledWith(`/transactions/${transaction.id}`);
      expect(result).toBe('Transaction deleted successfully');
    });

    it('should reject with an error message when an error occurs', async () => {
      mockDbDelete.mockImplementationOnce(() => {
        throw new Error('Some error');
      });

      await expect(deleteTransaction(transaction.id)).rejects.toThrow('Error deleting transaction');
    });
  });
});
