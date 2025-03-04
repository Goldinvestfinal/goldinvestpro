import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <Card className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-900/20 p-6 mb-8 backdrop-blur-sm">
      <h3 className="text-lg mb-4 text-amber-400">Transaction History</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-amber-900/20">
              <TableHead className="text-amber-400">Date</TableHead>
              <TableHead className="text-amber-400">Type</TableHead>
              <TableHead className="text-amber-400">Amount</TableHead>
              <TableHead className="text-amber-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} className="border-amber-900/20">
                <TableCell className="text-amber-400/80">{transaction.date}</TableCell>
                <TableCell className="text-amber-400/80">{transaction.type}</TableCell>
                <TableCell className="text-amber-400/80">${transaction.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};