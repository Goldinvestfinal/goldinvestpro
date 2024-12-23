import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const CheckoutSheet = ({ product, onSuccess }: { product: any, onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayPalCheckout = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your purchase",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          amount: product.price,
        }),
      });

      const { orderUrl } = await response.json();
      window.location.href = orderUrl;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast({
        title: "Error",
        description: "Unable to process PayPal payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        >
          Purchase Now
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-amber-900/20">
        <SheetHeader>
          <SheetTitle className="text-amber-400">Checkout</SheetTitle>
          <SheetDescription className="text-amber-400/80">
            Complete your purchase securely with PayPal
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-400">{product.name}</h3>
            <p className="text-amber-400/80">{product.description}</p>
            <div className="text-2xl font-bold text-amber-400">${product.price.toLocaleString()}</div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-[#0070ba] hover:bg-[#003087] text-white flex items-center justify-center gap-2"
              onClick={handlePayPalCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Processing...
                </span>
              ) : (
                "Pay with PayPal"
              )}
            </Button>
          </div>

          <div className="text-sm text-amber-400/60">
            <p>• Secure payment processing</p>
            <p>• 24/7 customer support</p>
            <p>• Satisfaction guaranteed</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};