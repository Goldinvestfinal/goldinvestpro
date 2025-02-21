
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldChart } from "@/components/GoldChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface WalletInfo {
  balance: number;
  is_demo: boolean;
}

const Dashboard = () => {
  const { data: wallets } = useQuery({
    queryKey: ["dashboard-wallets"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("wallets")
        .select("balance, is_demo")
        .eq("user_id", user.id);

      if (error) throw error;
      return data as WalletInfo[];
    },
  });

  const { data: recentTransactions } = useQuery({
    queryKey: ["dashboard-transactions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Transaction[];
    },
  });

  const realWallet = wallets?.find(w => !w.is_demo);
  const demoWallet = wallets?.find(w => w.is_demo);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - GoldInvestPro</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Real Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${realWallet?.balance?.toLocaleString() || "0"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demo Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${demoWallet?.balance?.toLocaleString() || "0"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Gold Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <GoldChart />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions?.map((transaction) => (
                    <TableRow key={transaction.id}>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
