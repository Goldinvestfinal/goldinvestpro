import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Invest in Your Future with</span>
            <span className="block text-primary">Gold Investment</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Start your journey towards financial freedom with our secure and easy-to-use investment platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button size="lg" className="w-full sm:w-auto">Get Started Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};