
import { formatDistanceToNow } from "date-fns";
import { ArrowDownToLine, ArrowUpToLine, MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string | number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  details?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  if (transactions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No transactions yet.</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {transaction.type === "deposit" ? (
                      <>
                        <div className="bg-green-500/20 p-2 rounded-full">
                          <ArrowDownToLine className="h-4 w-4 text-green-500" />
                        </div>
                        <span className="font-medium">Deposit</span>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-500/20 p-2 rounded-full">
                          <ArrowUpToLine className="h-4 w-4 text-red-500" />
                        </div>
                        <span className="font-medium">Withdrawal</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className={transaction.type === "deposit" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {transaction.type === "deposit" ? "+" : "-"}
                  ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      transaction.status === "completed" ? "default" : 
                      transaction.status === "pending" ? "outline" : 
                      "secondary"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {transaction.details || <MoreHorizontal className="h-4 w-4" />}
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
