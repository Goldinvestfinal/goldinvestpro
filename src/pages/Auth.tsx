import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/wallet");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-400 mb-8 text-center">GOLDINVEST</h1>
        <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-900/20 p-6 rounded-lg backdrop-blur-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#b45309',
                    brandAccent: '#92400e',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/wallet`}
            additionalData={{
              first_name: undefined,
              last_name: undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;