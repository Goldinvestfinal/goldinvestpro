import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
interface GoldPrice {
  price: number;
  timestamp: number;
  currency: string;
}
export const GoldChart = () => {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["gold-price"],
    queryFn: async () => {
      console.log("Fetching gold price...");
      const {
        data,
        error
      } = await supabase.functions.invoke<GoldPrice>("gold-stats");
      if (error) {
        console.error("Error fetching gold price:", error);
        toast.error("Failed to fetch gold price. Please try again later.");
        throw error;
      }
      console.log("Received gold price data:", data);
      return data;
    },
    refetchInterval: 300000 // Refetch every 5 minutes
  });
  if (isLoading) {
    return <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </Card>;
  }
  if (error) {
    console.error("Error in GoldChart:", error);
    return <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading gold price data. Please try again later.
        </div>
      </Card>;
  }
  if (!data || !data.price) {
    console.error("Invalid data structure received:", data);
    return <Card className="p-6">
        <div className="text-center text-red-500">
          No price data available. Please try again later.
        </div>
      </Card>;
  }
  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(data.price);
  const formattedDate = new Date(data.timestamp * 1000).toLocaleString();
  return;
};