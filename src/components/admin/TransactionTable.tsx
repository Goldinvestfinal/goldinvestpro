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

interface Transaction {
  id: string;
  wallet_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  selectedWallet: string | null;
  wallets: any[];
  profiles: Profile[];
  onBack: () => void;
  getUserName: (userId: string) => string;
}

export const TransactionTable = ({
  transactions,
  selectedWallet,
  wallets,
  profiles,
  onBack,
  getUserName,
}: TransactionTableProps) => {
  if (!selectedWallet) {
    return (
      <div className="text-center py-4">
        Select a wallet to view its transactions
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Transactions for {getUserName(wallets.find(w => w.id === selectedWallet)?.user_id || '')}
        </h3>
        <Button variant="outline" onClick={onBack}>
          Back to All Wallets
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell>${transaction.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};