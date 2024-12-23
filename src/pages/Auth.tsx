import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ChatAdvisor } from "@/components/ChatAdvisor";

const Auth = () => {
  // Get the current origin for the redirect URL
  const redirectTo = `${window.location.origin}/`;

  return (
    <div className="min-h-screen bg-background">
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
                },
              },
            },
          }}
          providers={["google"]}
          redirectTo={redirectTo}
        />
      </div>
      <ChatAdvisor />
    </div>
  );
};

export default Auth;