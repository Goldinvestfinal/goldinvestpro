
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { AdminBlogPosts } from "@/components/admin/AdminBlogPosts";
import { AdminWallets } from "@/components/admin/AdminWallets";
import { AdminTransactions } from "@/components/admin/AdminTransactions";

const Admin = () => {
  const navigate = useNavigate();
  
  // Check if user is admin
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['check-admin'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      if (error || !data) return false;
      return data.is_admin;
    },
  });

  useEffect(() => {
    if (!checkingAdmin && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, checkingAdmin, navigate]);

  if (checkingAdmin) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Admin Dashboard - GoldInvestPro</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="blog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <AdminBlogPosts />
        </TabsContent>

        <TabsContent value="wallets">
          <AdminWallets />
        </TabsContent>

        <TabsContent value="transactions">
          <AdminTransactions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
