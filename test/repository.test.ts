import { expect } from 'chai';
import { JsonDB, Config } from 'node-json-db';
import { Transaction } from '../src/interfaces';

// Data Access Layer Unit Tests
describe('Data Access Layer', () => {
  let db: JsonDB;

  before(() => {
    // Set up the JSON DB for testing
    db = new JsonDB(new Config('./testDB', true, false, '/'));
  });

  beforeEach(() => {
    // Clear the testDB before each test
    db.delete('/transactions');
  });

  after(() => {
    // Clean up the testDB after all tests are done
    db.delete('/transactions');
  });

  describe('Transaction Repository', () => {
    it('should store a transaction', () => {
      const transaction: Transaction = {
        id: 'transaction-1',
        name: 'John Doe',
        amount: 100,
      };

      // Save the transaction to the repository
      db.push(`/transactions/${transaction.id}`, transaction);

      // Retrieve the saved transaction
      const savedTransaction = db.getData(`/transactions/${transaction.id}`);

      // Assert that the saved transaction matches the original transaction
      expect(savedTransaction).to.deep.equal(transaction);
    });

    it('should delete a transaction', () => {
      const transaction: Transaction = {
        id: 'transaction-1',
        name: 'John Doe',
        amount: 100,
      };

      // Save the transaction to the repository
      db.push(`/transactions/${transaction.id}`, transaction);

      // Delete the transaction
      db.delete(`/transactions/${transaction.id}`);

      // Retrieve the deleted transaction
      const deletedTransaction = db.getData(`/transactions/${transaction.id}`);

      // Assert that the deleted transaction is undefined
      expect(deletedTransaction).to.be.undefined;
    });

    // Add more unit tests for other data access layer operations
  });
});

// Data Access Layer Integration Tests
describe('Data Access Layer Integration Tests', () => {
  let db: JsonDB;

  before(() => {
    // Set up the JSON DB for testing
    db = new JsonDB(new Config('./testDB', true, false, '/'));
  });

  beforeEach(() => {
    // Clear the testDB before each test
    db.delete('/transactions');
  });

  after(() => {
    // Clean up the testDB after all tests are done
    db.delete('/transactions');
  });

  describe('Transaction Repository', () => {
    it('should save a transaction to the database', () => {
      // Create a new transaction
      const transaction: Transaction = {
        id: 'transaction-1',
        name: 'John Doe',
        amount: 100,
      };

      // Save the transaction to the repository
      db.push(`/transactions/${transaction.id}`, transaction);

      // Retrieve the saved transaction directly from the database
      const savedTransaction = db.getData(`/transactions/${transaction.id}`);

      // Assert that the saved transaction matches the original transaction
      expect(savedTransaction).to.deep.equal(transaction);
    });

    // Add more integration tests for other data access layer operations
  });
});
