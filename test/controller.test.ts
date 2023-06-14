import controller from '../src/controller';
import {expect, jest, test} from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { Request, Response } from 'express';

// Create an Express app and mount the controller router
const app = express();
app.use(express.json());
app.use(controller);


describe('Transaction Controller', () => {
  test
  test('should create a new transaction', () => {
    // Create a mock request object with the required data
    const mockRequest: Request = {
      body: {
        id: 'transaction-id',
        name: 'Transaction',
        amount: 100
      },
    } as Request;


    // Create a mock response object
      let responseObject = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      })
    } as unknown as Response;

    // Call the postTransaction function with the mock request and response objects
    controller.postTransaction(mockRequest, mockResponse as Response);
    // Assert the expected behavior based on the response
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Transaction created successfully' });
  });
/*
  test('should retrieve all transactions', () => {
    const mockRequest: Request = {} as Request;
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    
    controller.getAllTransactions(mockRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // Assert the expected behavior based on the response JSON
    // For example, if you expect the response to contain an array of transactions
    // you can use expect(mockResponse.json).toHaveBeenCalledWith([...]);    
  });

  test('should retrieve a transaction by ID', () => {
    const mockRequest: Request = {
      params: {
      id: 'transaction-id'
      }
      } as Request;
      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
      
      controller.getTransaction(mockRequest, mockResponse);
      
      // Assert the expected behavior based on the response
      // For example, if you expect the response to contain the transaction with the specified ID
      // you can use expect(mockResponse.status).toHaveBeenCalledWith(200) and expect(mockResponse.json).toHaveBeenCalledWith({ ... });      

  });

  test('should update a transaction', () => {
    const mockRequest: Request = {
      params: {
      id: 'transaction-id'
      },
      body: {
      name: 'Updated Transaction',
      amount: 200
      }
      } as Request;

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
      
      controller.updateTransaction(mockRequest, mockResponse);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Transaction updated successfully' });
      
  });

  test('should delete a transaction', () => {
    const mockRequest: Request = {
      params: {
      id: 'transaction-id'
      }
      } as Request;

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
      
      controller.deleteTransaction(mockRequest, mockResponse);
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Transaction deleted successfully' });
      
  });
  */
});
