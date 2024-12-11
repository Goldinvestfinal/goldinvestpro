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
    <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/20 p-6 mb-8">
      <h3 className="text-lg mb-4 text-purple-100">Transaction History</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-purple-700/20">
              <TableHead className="text-purple-200">Date</TableHead>
              <TableHead className="text-purple-200">Type</TableHead>
              <TableHead className="text-purple-200">Amount</TableHead>
              <TableHead className="text-purple-200">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} className="border-purple-700/20">
                <TableCell className="text-purple-200/80">{transaction.date}</TableCell>
                <TableCell className="text-purple-200/80">{transaction.type}</TableCell>
                <TableCell className="text-purple-200/80">${transaction.amount}</TableCell>
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