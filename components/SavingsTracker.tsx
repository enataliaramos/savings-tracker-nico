'use client';
import { useState } from 'react';

export default function SavingsTracker() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [transactions, setTransactions] = useState<Array<{id: string; amount: number; date: string; note: string}>>([]);

  const handleDeposit = () => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || !Number.isFinite(numAmount)) return;
    
    const newTransaction = {
      id: Date.now().toString(),
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
    <div style={{ 
      maxWidth: '430px', 
      margin: '0 auto', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      {/* Header with Balance */}
      <div style={{ 
        backgroundColor: '#4ade80',
        padding: '30px 20px',
        borderRadius: '12px',
        marginBottom: '20px',
        color: 'white'
      }}>
        <div style={{ fontSize: '16px', marginBottom: '8px' }}>
          Nico&apos;s Current Balance
        </div>
        <div style={{ 
          fontSize: '42px', 
          fontWeight: 'bold',
        }}>
          ${balance.toFixed(2)}
        </div>
      </div>

      {/* Action Buttons */}
      {isAdmin ? (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '16px',
              marginBottom: '10px'
            }}
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '16px',
              marginBottom: '15px'
            }}
          />
          <button
            onClick={handleDeposit}
            disabled={!amount || Number(amount) <= 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              opacity: (!amount || Number(amount) <= 0) ? 0.5 : 1
            }}
          >
            Add Deposit
          </button>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '16px',
              marginBottom: '15px'
            }}
          />
          <button
            onClick={() => setIsAdmin(password === '123456')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login as Admin
          </button>
        </div>
      )}

      {/* Transactions */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '500',
          marginBottom: '15px',
          color: '#374151'
        }}>
          Transaction History
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              style={{ 
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{tx.note}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {new Date(tx.date).toLocaleDateString()}
                </div>
              </div>
              <div style={{ color: '#4ade80', fontWeight: '500' }}>
                +${tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              color: '#6b7280',
              padding: '20px 0'
            }}>
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
