import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface PriceData {
  timestamp: number;
  price: number;
}

export const PriceHistoryChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gold-price-history"],
    queryFn: async () => {
      console.log("Fetching gold price history...");
      const { data, error } = await supabase.functions.invoke("gold-stats");
      if (error) {
        console.error("Error fetching gold price history:", error);
        throw error;
      }
      console.log("Received gold price history data:", data);
      return data as PriceData;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading price history data. Please try again later.
        </div>
      </Card>
    );
  }

  if (!data || !data.price) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          No price data available. Please try again later.
        </div>
      </Card>
    );
  }

  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(data.price);

  const formattedDate = new Date(data.timestamp * 1000).toLocaleString();

  return (
    <Card className="p-6 bg-gray-900/50 backdrop-blur-sm border-gold/20">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gold">Gold Price History</h2>
          <p className="text-4xl font-bold mt-2">{formattedPrice}</p>
          <p className="text-sm text-gray-400 mt-1">Last updated: {formattedDate}</p>
        </div>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { timestamp: data.timestamp - 86400, price: data.price * 0.98 },
                { timestamp: data.timestamp - 43200, price: data.price * 0.99 },
                { timestamp: data.timestamp, price: data.price },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleDateString()}
                stroke="#888"
              />
              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `€${value.toLocaleString()}`}
                stroke="#888"
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleString()}
                formatter={(value: number) => [`€${value.toLocaleString()}`, 'Price']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#B8860B"
                strokeWidth={2}
                dot={{ fill: '#B8860B' }}
                activeDot={{ r: 8 }}
                name="Gold Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};