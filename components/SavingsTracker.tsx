'use client';
import { useState, useEffect } from 'react';

interface Transaction {
  id: string; // Adding an ID to uniquely identify transactions
  amount: number;
  date: string;
  note: string;
}

export default function SavingsTracker() {
  const [balance, setBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('balance');
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
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
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleDeposit = () => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || !Number.isFinite(numAmount)) return;
    
    const newTransaction = {
      id: Date.now().toString(), // Create unique ID
      amount: numAmount,
      date: new Date().toISOString(),
      note: note || 'Deposit'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + numAmount);
    setAmount('');
    setNote('');
  };

  const handleDelete = (transaction: Transaction) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== transaction.id));
      setBalance(prev => prev - transaction.amount);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setAmount(transaction.amount.toString());
    setNote(transaction.note);
  };

  const handleUpdate = (oldTransaction: Transaction) => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || !Number.isFinite(numAmount)) return;

    const updatedTransaction = {
      ...oldTransaction,
      amount: numAmount,
      note: note
    };

    setTransactions(prev => 
      prev.map(t => t.id === oldTransaction.id ? updatedTransaction : t)
    );

    // Adjust the balance: remove old amount and add new amount
    setBalance(prev => prev - oldTransaction.amount + numAmount);
    
    setEditingId(null);
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
              onClick={editingId ? () => handleUpdate(transactions.find(t => t.id === editingId)!) : handleDeposit}
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
              {editingId ? 'Update Transaction' : 'Add Deposit'}
            </button>
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setAmount('');
                  setNote('');
                }}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Cancel Edit
              </button>
            )}
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
            {transactions.map((tx) => (
              <div 
                key={tx.id}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#22c55e', fontWeight: '500' }}>
                    +${tx.amount.toFixed(2)}
                  </div>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        onClick={() => handleEdit(tx)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#4b5563',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tx)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
