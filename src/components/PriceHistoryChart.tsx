import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
interface PriceData {
  timestamp: number;
  price: number;
}
export const PriceHistoryChart = () => {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["gold-price-history"],
    queryFn: async () => {
      console.log("Fetching gold price history...");
      const {
        data,
        error
      } = await supabase.functions.invoke("gold-stats");
      if (error) {
        console.error("Error fetching gold price history:", error);
        throw error;
      }
      console.log("Received gold price history data:", data);
      return data as PriceData;
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
    return <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading price history data. Please try again later.
        </div>
      </Card>;
  }
  if (!data || !data.price) {
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