import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  is_demo: boolean;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

interface WalletTableProps {
  wallets: Wallet[];
  profiles: Profile[];
  onUpdateBalance: (walletId: string, currentBalance: number) => void;
  onAddTransaction: (walletId: string) => void;
  onViewTransactions: (walletId: string) => void;
}

export const WalletTable = ({
  wallets,
  profiles,
  onUpdateBalance,
  onAddTransaction,
  onViewTransactions,
}: WalletTableProps) => {
  const getUserName = (userId: string) => {
    const profile = profiles.find(p => p.id === userId);
    return profile 
      ? `${profile.first_name} ${profile.last_name}`
      : 'Unknown User';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Wallet Type</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wallets.map((wallet) => (
          <TableRow key={wallet.id}>
            <TableCell>{getUserName(wallet.user_id)}</TableCell>
            <TableCell>
              <Badge variant={wallet.is_demo ? "secondary" : "default"}>
                {wallet.is_demo ? 'Demo' : 'Real'}
              </Badge>
            </TableCell>
            <TableCell>${wallet.balance.toLocaleString()}</TableCell>
            <TableCell className="space-x-2">
              <Button
                variant="outline"
                onClick={() => onUpdateBalance(wallet.id, wallet.balance)}
              >
                Update Balance
              </Button>
              <Button
                variant="outline"
                onClick={() => onViewTransactions(wallet.id)}
              >
                View Transactions
              </Button>
              <Button
                variant="outline"
                onClick={() => onAddTransaction(wallet.id)}
              >
                Add Transaction
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};