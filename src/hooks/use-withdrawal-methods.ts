
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { WithdrawalMethod } from "@/types/wallet";

export const useWithdrawalMethods = (isSheetOpen: boolean) => {
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>([]);
  const { toast } = useToast();

  const fetchWithdrawalMethods = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("withdrawal_methods")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      if (data) setWithdrawalMethods(data);
    } catch (error) {
      console.error("Error fetching withdrawal methods:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load withdrawal methods",
      });
    }
  };

  useEffect(() => {
    if (isSheetOpen) {
      fetchWithdrawalMethods();
    }
  }, [isSheetOpen]);

  const addWithdrawalMethod = (newMethod: WithdrawalMethod) => {
    setWithdrawalMethods((prev) => [...prev, newMethod]);
  };

  return {
    withdrawalMethods,
    addWithdrawalMethod
  };
};
