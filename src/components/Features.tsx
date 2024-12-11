import { Wallet, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Secure Wallet",
    description: "Your investments are protected with state-of-the-art security measures",
    icon: Shield,
  },
  {
    title: "Easy Transactions",
    description: "Deposit and withdraw funds with just a few clicks",
    icon: Wallet,
  },
  {
    title: "Market Analysis",
    description: "Real-time market data and professional analysis tools",
    icon: TrendingUp,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">Experience the best in gold investment</p>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};