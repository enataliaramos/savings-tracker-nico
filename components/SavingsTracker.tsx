'use client';
import { useState, useEffect } from 'react';

interface Card {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  note: string;
}

const availableCards: Card[] = [
  {
    id: '1',
    name: "Nico's Account",
    color: '#4ade80',
    description: 'Main Savings Account'
  },
  {
    id: '2',
    name: "Nico's Adventure",
    color: '#60a5fa',
    description: 'For Special Adventures'
  },
  {
    id: '3',
    name: "Nico's Fun Money",
    color: '#a855f7',
    description: 'Entertainment & Hobbies'
  }
];

export default function SavingsTracker() {
  const [selectedCard, setSelectedCard] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedCard');
      return saved || availableCards[0].id;
    }
    return availableCards[0].id;
  });

  const [balances, setBalances] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('balances');
      return saved ? JSON.parse(saved) : {
        '1': 0,
        '2': 0,
        '3': 0
      };
    }
    return { '1': 0, '2': 0, '3': 0 };
  });

  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('transactions');
      return saved ? JSON.parse(saved) : {
        '1': [],
        '2': [],
        '3': []
      };
    }
    return { '1': [], '2': [], '3': [] };
  });

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCardSelect, setShowCardSelect] = useState(true);

  useEffect(() => {
    localStorage.setItem('balances', JSON.stringify(balances));
  }, [balances]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('selectedCard', selectedCard);
  }, [selectedCard]);

  const handleDeposit = () => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || !Number.isFinite(numAmount)) return;
    
    const newTransaction = {
      id: Date.now().toString(),
      amount: numAmount,
      date: new Date().toISOString(),
      note: note || 'Deposit'
    };
    
    setTransactions(prev => ({
      ...prev,
      [selectedCard]: [newTransaction, ...(prev[selectedCard] || [])]
    }));

    setBalances(prev => ({
      ...prev,
      [selectedCard]: (prev[selectedCard] || 0) + numAmount
    }));

    setAmount('');
    setNote('');
  };

  const handleDelete = (transaction: Transaction) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => ({
        ...prev,
        [selectedCard]: prev[selectedCard].filter(t => t.id !== transaction.id)
      }));

      setBalances(prev => ({
        ...prev,
        [selectedCard]: prev[selectedCard] - transaction.amount
      }));
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
      note: note || 'Deposit'
    };

    setTransactions(prev => ({
      ...prev,
      [selectedCard]: prev[selectedCard].map(t => 
        t.id === oldTransaction.id ? updatedTransaction : t
      )
    }));

    setBalances(prev => ({
      ...prev,
      [selectedCard]: prev[selectedCard] - oldTransaction.amount + numAmount
    }));

    setEditingId(null);
    setAmount('');
    setNote('');
  };
  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
    setShowCardSelect(false);
  };

  const totalSavings = Object.values(balances).reduce((sum, balance) => sum + balance, 0);
  const currentCard = availableCards.find(c => c.id === selectedCard) || availableCards[0];

  if (!isAdmin) {
    return (
      <div style={{ 
        maxWidth: '430px', 
        margin: '0 auto', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '500',
            marginBottom: '20px',
            color: '#374151',
            textAlign: 'center'
          }}>
            Welcome to Nico&apos;s Hub
          </h3>
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
            Login to Hub
          </button>
        </div>
      </div>
    );
  }

  if (showCardSelect) {
    return (
      <div style={{ 
        maxWidth: '430px', 
        margin: '0 auto', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '500',
            marginBottom: '15px',
            color: '#374151'
          }}>
            Select Account
          </h3>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {availableCards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardSelect(card.id)}
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  backgroundColor: '#f8f9fa',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `2px solid ${card.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ 
                  fontWeight: '500', 
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px' 
                }}>
                  <span style={{
                    backgroundColor: card.color,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    border: '2px solid white'
                  }}></span>
                  {card.name}
                  <span style={{
                    marginLeft: 'auto',
                    color: card.color,
                    fontWeight: 'bold'
                  }}>
                    ${balances[card.id]?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '14px',
                  opacity: 0.7
                }}>
                  {card.description}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#374151',
              marginBottom: '5px'
            }}>
              Total Savings
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              ${totalSavings.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => {
              setIsAdmin(false);
              setPassword('');
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

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
        backgroundColor: currentCard.color,
        padding: '30px 20px',
        borderRadius: '12px',
        marginBottom: '20px',
        color: 'white'
      }}>
        <div style={{ fontSize: '16px', marginBottom: '8px' }}>
          {currentCard.name}
        </div>
        <div style={{ 
          fontSize: '42px', 
          fontWeight: 'bold',
        }}>
          ${balances[selectedCard]?.toFixed(2) || '0.00'}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setShowCardSelect(true)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          ← Back to Cards
        </button>

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
          onClick={editingId ? 
            () => handleUpdate(transactions[selectedCard].find(t => t.id === editingId)!) :
            handleDeposit
          }
          disabled={!amount || Number(amount) <= 0}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: currentCard.color,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: (!amount || Number(amount) <= 0) ? 0.5 : 1
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
              padding: '12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

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
          {transactions[selectedCard]?.map((tx) => (
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: currentCard.color, fontWeight: '500' }}>
                  +${tx.amount.toFixed(2)}
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => handleEdit(tx)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(tx)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!transactions[selectedCard] || transactions[selectedCard].length === 0) && (
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
