
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  is_demo: boolean;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const AdminWallets = () => {
  const { data: wallets, isLoading } = useQuery({
    queryKey: ["admin-wallets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleUpdateBalance = async (wallet: Wallet) => {
    const newBalance = prompt("Enter new balance:", wallet.balance.toString());
    if (!newBalance) return;

    const balance = parseFloat(newBalance);
    if (isNaN(balance)) {
      alert("Please enter a valid number");
      return;
    }

    const { error } = await supabase
      .from("wallets")
      .update({ balance })
      .eq("id", wallet.id);

    if (error) {
      console.error("Error updating balance:", error);
      alert("Error updating balance");
      return;
    }

    // Refresh the data
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading wallets...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Wallets</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wallets?.map((wallet: any) => (
            <TableRow key={wallet.id}>
              <TableCell>
                {wallet.profiles?.first_name} {wallet.profiles?.last_name}
              </TableCell>
              <TableCell>{wallet.is_demo ? "Demo" : "Real"}</TableCell>
              <TableCell>${wallet.balance.toLocaleString()}</TableCell>
              <TableCell>
                {new Date(wallet.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateBalance(wallet)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update Balance
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
