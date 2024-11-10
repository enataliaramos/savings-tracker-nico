'use client';
import { useState, useEffect } from 'react';

interface Transaction {
  amount: number;
  date: string;
  note: string;
}

export default function SavingsTracker() {
  const [balance, setBalance] = useState(() => {
    // Load initial balance from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('balance');
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Load initial transactions from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('transactions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleDeposit = () => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || !Number.isFinite(numAmount)) return;
    
    const newTransaction = {
      amount: numAmount,
      date: new Date().toISOString(),
      note: note || 'Deposit'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
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
              onChange={e => setAmount(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Note (optional)"
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button 
              onClick={handleDeposit}
              disabled={!amount || Number(amount) <= 0}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: !amount || Number(amount) <= 0 ? '#ccc' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !amount || Number(amount) <= 0 ? 'not-allowed' : 'pointer'
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
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button 
              onClick={() => setIsAdmin(password === '123456')}
              style={{ 
                width: '100%', 
                padding: '8px', 
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Login as Admin
            </button>
          </div>
        )}

        <div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Transaction History</h3>
          <div>
            {transactions.map((tx, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '10px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '4px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '500' }}>{tx.note}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {new Date(tx.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ color: '#22c55e', fontWeight: '500' }}>
                  +${tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
