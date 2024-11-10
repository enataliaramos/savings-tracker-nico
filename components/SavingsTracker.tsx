'use client';
import { useState } from 'react';

interface Transaction {
  amount: number;
  date: string;
  note: string;
}

export default function SavingsTracker() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const handleDeposit = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) return;
    
    const newTransaction: Transaction = {
      amount: numAmount,
      date: new Date().toISOString(),
      note: note || 'Deposit',
    };
    
    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => prev + numAmount);
    setAmount('');
    setNote('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Nico&apos;s Savings Tracker
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
            ${balance.toFixed(2)}
          </div>
          <div style={{ color: '#666' }}>Current Balance</div>
        </div>

        {isAdmin ? (
          <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button 
              onClick={handleDeposit}
              disabled={!amount || isNaN(parseFloat(amount))}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: !amount || isNaN(parseFloat(amount)) ? '#ccc' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !amount || isNaN(parseFloat(amount)) ? 'not-allowed' : 'pointer'
              }}
            >
              Add Deposit
            </button>
          </div>
        ) : (
          <div style={{ marginBottom: '30px' }}>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button 
              onC
