import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();

          if (profile?.is_admin) {
            setIsAdmin(true);
          } else {
            navigate("/wallet");
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem checking your session. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();

          if (profile?.is_admin) {
            setIsAdmin(true);
          } else {
            navigate("/wallet");
          }
        } catch (error) {
          console.error("Profile check error:", error);
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "There was a problem verifying your profile. Please try again.",
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="container mx-auto p-6">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gold">Welcome to GOLDINVEST</h1>
          <p className="text-foreground">Sign in to access your account</p>
        </div>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#B8860B',
                  brandAccent: '#8B6914',
                  brandButtonText: "white",
                  defaultButtonBackground: "#B8860B",
                  defaultButtonBackgroundHover: "#8B6914",
                  inputBackground: "white",
                  inputBorder: "#B8860B",
                  inputBorderHover: "#8B6914",
                  inputBorderFocus: "#B8860B",
                  inputText: "black",
                  inputLabelText: "white",
                  messageText: "white",
                  anchorTextColor: "#FFD700",
                  dividerBackground: "#B8860B",
                },
              },
            },
            className: {
              anchor: 'text-gold hover:text-gold-light',
              button: 'bg-gold hover:bg-gold-dark text-white',
              container: 'text-foreground',
              label: 'text-foreground',
              loader: 'border-gold',
              message: 'text-foreground',
            },
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;