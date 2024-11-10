'use client';
import { useState, ChangeEvent } from 'react';

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
    if (isNaN(numAmount)) return;
    
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

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
              onChange={handleAmountChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              placeholder="Note (optional)"
              value={note}
              onChange={handleNoteChange}
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
              onChange={handlePasswordChange}
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
