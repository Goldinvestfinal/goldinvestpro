import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

// Sample data for random notifications
const userNames = [
  "Alice", "Bob", "Charlie", "David", "Emma",
  "Frank", "Grace", "Henry", "Isabel", "Jack"
];

const activities = [
  {
    type: "earning",
    messages: [
      "just earned $",
      "received $",
      "made $"
    ],
    amounts: [50, 100, 150, 200, 250, 300],
    icon: DollarSign
  },
  {
    type: "investing",
    messages: [
      "invested $",
      "added $",
      "deposited $"
    ],
    amounts: [500, 1000, 1500, 2000, 2500],
    icon: TrendingUp
  },
  {
    type: "buying",
    messages: [
      "purchased gold worth $",
      "bought $",
      "acquired $"
    ],
    amounts: [300, 400, 500, 600, 700],
    icon: ShoppingCart
  }
];

const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const VirtualNotifications = () => {
  useEffect(() => {
    // Function to generate a random notification
    const generateNotification = () => {
      const activity = getRandomElement(activities);
      const userName = getRandomElement(userNames);
      const message = getRandomElement(activity.messages);
      const amount = getRandomElement(activity.amounts);
      const Icon = activity.icon;

      toast({
        title: "User Activity",
        description: (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-gold" />
            <span>
              <span className="font-semibold text-gold">{userName}</span>
              {" "}{message}{amount} in gold
            </span>
          </div>
        ),
        duration: 3000,
      });
    };

    // Generate initial notification
    generateNotification();

    // Set up interval for recurring notifications
    const interval = setInterval(() => {
      generateNotification();
    }, 8000); // Show a new notification every 8 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
};