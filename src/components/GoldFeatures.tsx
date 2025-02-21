import { Shield, Lock, TrendingUp } from "lucide-react";
export const GoldFeatures = () => {
  return <section className="bg-background py-24 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gold">
            Gold's tangible nature allows you to preserve assets independently, free from bank control
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <Shield className="w-12 h-12 text-gold mx-auto" />
            <h3 className="text-xl font-semibold text-gold">Secure Asset</h3>
            <p className="text-gray-400">Physical gold offers unmatched security and stability in times of economic uncertainty.</p>
          </div>
          
          <div className="text-center space-y-4">
            <Lock className="w-12 h-12 text-gold mx-auto" />
            <h3 className="text-xl font-semibold text-gold">True Ownership</h3>
            <p className="text-gray-400">Secure your future with gold your trusted destination for safe and lucrative opportunities.</p>
          </div>
          
          <div className="text-center space-y-4">
            <TrendingUp className="w-12 h-12 text-gold mx-auto" />
            <h3 className="text-xl font-semibold text-gold">Value Preservation</h3>
            <p className="text-gray-400">Throughout history, gold has maintained its value against currency devaluation.</p>
          </div>
        </div>
      </div>
    </section>;
};