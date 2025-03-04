
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ChatAdvisor } from "@/components/ChatAdvisor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the current origin for the redirect URL
  const redirectTo = `${window.location.origin}/dashboard`;

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Auth error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please try signing in again.",
        });
      }
    };

    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // After signing in, create default wallets for the user
          try {
            const { data, error } = await supabase
              .from("wallets")
              .select("id")
              .eq("user_id", session.user.id);
              
            if (error) throw error;
            
            // If user has no wallets, create them
            if (!data || data.length === 0) {
              const realWalletPromise = supabase.from("wallets").insert({
                user_id: session.user.id,
                balance: 0,
                is_demo: false,
                currency: "USD"
              });

              const demoWalletPromise = supabase.from("wallets").insert({
                user_id: session.user.id,
                balance: 10000, // Demo wallet starts with $10,000
                is_demo: true,
                currency: "USD"
              });

              await Promise.all([realWalletPromise, demoWalletPromise]);
            }
          } catch (error) {
            console.error("Error creating wallets:", error);
          }
          
          navigate("/dashboard");
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sign In - GoldInvestPro</title>
      </Helmet>
      <Navbar />
      <div className="max-w-md mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold text-gold mb-8 text-center">
          Join the Gold Standard
        </h1>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#B8860B',
                  brandAccent: '#8B6914',
                  inputText: '#FFFFFF',
                  inputBackground: 'transparent',
                  inputBorder: '#B8860B',
                  inputLabelText: '#FFFFFF',
                  inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
                },
              },
            },
            style: {
              input: {
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                border: '1px solid #B8860B',
              },
              label: {
                color: '#FFFFFF',
              },
              message: {
                color: '#FFFFFF',
              },
              anchor: {
                color: '#FFD700',
                textDecoration: 'underline',
              },
              divider: {
                background: '#B8860B',
              },
              button: {
                backgroundColor: '#B8860B',
                color: '#FFFFFF',
                transition: 'background-color 0.2s ease',
              },
            },
            className: {
              button: 'hover:bg-[#8B6914]',
            },
          }}
          providers={[]}
          redirectTo={redirectTo}
          view="sign_up"
          additionalData={{
            first_name: '',
            last_name: '',
            phone: '',
          }}
        />
      </div>
      <ChatAdvisor />
    </div>
  );
};

export default Auth;
