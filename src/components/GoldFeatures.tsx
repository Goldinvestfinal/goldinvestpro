import { Shield, Lock, TrendingUp } from "lucide-react";

export const GoldFeatures = () => {
  return (
    <section className="bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <Shield className="w-12 h-12 text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold">Secure Asset</h3>
            <p className="text-gray-400">Physical gold offers unmatched security and stability in times of economic uncertainty.</p>
          </div>
          
          <div className="text-center space-y-4">
            <Lock className="w-12 h-12 text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold">True Ownership</h3>
            <p className="text-gray-400">Gold's tangible nature allows you to preserve assets independently, free from bank control.</p>
          </div>
          
          <div className="text-center space-y-4">
            <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto" />
            <h3 className="text-xl font-semibold">Value Preservation</h3>
            <p className="text-gray-400">Throughout history, gold has maintained its value against currency devaluation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};