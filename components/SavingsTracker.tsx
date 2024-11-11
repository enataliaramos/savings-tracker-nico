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

  const progressPercentage = 100;

  return (
    <div style={{ 
      maxWidth: '430px', 
      margin: '0 auto', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div style={{ fontSize: '20px', fontWeight: '500' }}>Nico&apos;s Savings</div>
      </div>

      {/* Progress Circle */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `conic-gradient(#4ade80 ${progressPercentage}%, #e5e7eb ${progressPercentage}% 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {Math.round(progressPercentage)}%
          </div>
        </div>

        <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
          ${balance.toFixed(2)}
        </div>
        <div style={{ color: '#6b7280', marginBottom: '20px' }}>
          Current Balance
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
      }}>
        {isAdmin ? (
          <>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '16px'
              }}
            />
            <button
              onClick={handleDeposit}
              disabled={!amount || Number(amount) <= 0}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4ade80',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: (!amount || Number(amount) <= 0) ? 0.5 : 1
              }}
            >
              Add money
            </button>
          </>
        ) : (
          <div style={{ width: '100%' }}>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                marginBottom: '10px',
                fontSize: '16px'
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
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Login as Admin
            </button>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '500', 
          marginBottom: '15px',
          color: '#374151'
        }}>
          Recent activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              style={{ 
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
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
        </div>
      </div>
    </div>
  );
}
