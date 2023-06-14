import { JsonDB, Config } from 'node-json-db';
import { Transaction } from './interfaces';



export async function getDailySummary(): Promise<Record<string, number | Transaction>> {
    const db = new JsonDB(new Config('./transactionDB', true, false, '/'));
    const transactions = await db.getData('/transactions'); // Fetch the latest data each time
    const summary: Record<string, number | Transaction> = {};
  
    let totalAmount = 0;
    let maxTransaction: Transaction | null = null;
    
    for (const key in transactions) {
      const transaction = transactions[key] as Transaction;
      const { amount } = transaction;
  
      // Accumulate total amount
      totalAmount += amount;
  
      // Find the transaction with the maximum amount
      if (!maxTransaction || amount > maxTransaction.amount) {
        maxTransaction = transaction;
      }
    }
  
    // Calculate average amount
    const averageAmount = totalAmount / Object.keys(transactions).length;
  
    summary['totalAmount'] = totalAmount;
    summary['averageAmount'] = averageAmount;
  
    if (maxTransaction) {
      summary['maxTransaction'] = {
        id: maxTransaction.id,
        name: maxTransaction.name,
        amount: maxTransaction.amount
      };
    }
  
    return summary;
  }