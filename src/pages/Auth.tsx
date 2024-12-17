import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Session found, checking profile");
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Profile check error:", profileError);
            throw profileError;
          }

          if (profile?.is_admin) {
            console.log("Admin user detected");
            setIsAdmin(true);
          } else {
            console.log("Regular user detected, redirecting to wallet");
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
      console.log("Auth state changed:", event);
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();

          if (profileError) throw profileError;

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
      } else if (event === "SIGNED_OUT") {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gold mx-auto" />
          <p className="text-foreground">Loading your account...</p>
        </div>
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
      <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gold">Welcome to GOLDINVESTPRO</h1>
          <p className="text-foreground text-lg">Your Gateway to Digital Gold Investment</p>
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
                  inputPlaceholder: "gray",
                  messageText: "#666666",
                  messageTextDanger: "#ff4b4b",
                  anchorTextColor: "#B8860B",
                  dividerBackground: "#e5e7eb",
                },
              },
            },
            className: {
              anchor: 'text-gold hover:text-gold-dark transition-colors',
              button: 'bg-gold hover:bg-gold-dark text-white transition-colors',
              container: 'text-foreground',
              label: 'text-gray-700',
              loader: 'border-gold',
              message: 'text-gray-600',
            },
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;