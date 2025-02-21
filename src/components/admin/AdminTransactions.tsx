
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: number;
  wallet_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

export const AdminTransactions = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          wallets (
            id,
            user_id,
            profiles:user_id (
              first_name,
              last_name
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transactions</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction: any) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {transaction.wallets?.profiles?.first_name} {transaction.wallets?.profiles?.last_name}
              </TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell>${transaction.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(transaction.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
