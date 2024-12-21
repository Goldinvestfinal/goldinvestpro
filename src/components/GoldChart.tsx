import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GoldStats {
  prices_eur: number[];
  timestamps: string[];
}

export const GoldChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gold-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("gold-stats");
      if (error) throw error;
      return data as GoldStats;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading gold price data. Please try again later.
        </div>
      </Card>
    );
  }

  const chartData = data?.timestamps.map((timestamp, index) => ({
    timestamp: new Date(timestamp).toLocaleDateString(),
    price: data.prices_eur[index],
  }));

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gold Price Chart</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              tick={{ fill: 'currentColor' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#FFD700"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};