import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const Auth = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // Check if user is admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session?.user?.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
        } else {
          navigate("/wallet");
        }
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
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
          <p className="text-gray-500">Sign in to access your account</p>
        </div>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#B4833E',
                  brandAccent: '#956B33',
                },
              },
            },
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;