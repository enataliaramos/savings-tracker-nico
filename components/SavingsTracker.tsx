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
    <div style={{ maxWidth: '600px', margin
