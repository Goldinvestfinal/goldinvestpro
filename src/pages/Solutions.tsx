import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Coins, LineChart, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Solutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      title: "Physical Gold Investments",
      description: "Preserve your wealth with tangible assets like gold bars and coins. These timeless investments provide stability and serve as a hedge against market uncertainties.",
      icon: <Coins className="w-12 h-12 text-gold" />,
    },
    {
      title: "Gold and Precious Metals IRAs",
      description: "Secure your retirement with a Gold or Precious Metals IRA. Enjoy the dual benefits of physical asset ownership and tax-advantaged growth, backed by expert guidance to streamline the process.",
      icon: <Shield className="w-12 h-12 text-gold" />,
    },
    {
      title: "Gold Mining Stocks and ETFs",
      description: "Gain exposure to the gold market through mining stocks and exchange-traded funds (ETFs). These options offer liquidity and growth potential without the need for physical storage.",
      icon: <LineChart className="w-12 h-12 text-gold" />,
    },
    {
      title: "Diversified Portfolio Solutions",
      description: "Our seasoned financial advisors work with you to create a customized investment strategy. Whether you prefer traditional investments or alternative options, we'll design a portfolio that aligns with your goals and risk tolerance.",
      icon: <Users className="w-12 h-12 text-gold" />,
    },
    {
      title: "Investor Education and Insights",
      description: "We believe knowledge is power. Access a wealth of resources, including detailed guides, market analysis, and expert strategies, to make informed decisions about your investments.",
      icon: <BookOpen className="w-12 h-12 text-gold" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gold text-center mb-8">Investment Solutions</h1>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
          At GoldInvestPro, we make investing straightforward and empowering. Whether you're building wealth, saving for retirement, or protecting your assets, our comprehensive investment solutions are designed to help you achieve your financial goals with confidence.
        </p>
      </div>

      {/* Solutions Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-12 text-center">Tailored Solutions for Every Investor</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="bg-black/40 border border-gold/20">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{solution.icon}</div>
                  <CardTitle className="text-gold">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-8 text-center">Why Choose GoldInvestPro?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Personalized Strategies: Every investor's journey is unique. We tailor solutions to your financial objectives, risk profile, and time horizon.",
              "Expert Guidance: Our team of financial advisors and gold market analysts brings over a decade of expertise to every decision.",
              "Disciplined Approach: Grounded in thorough research and prudent risk management, we focus on long-term growth and stability.",
              "Transparent Fees: With GoldInvestPro, you'll always know what you're paying—no hidden costs or surprises.",
              "Dedicated Support: Your success is our priority. Our advisors are here to answer questions and guide you every step of the way."
            ].map((feature, index) => (
              <div key={index} className="bg-black/40 p-6 rounded-lg border border-gold/20">
                <p className="text-gray-300">
                  <span className="text-gold font-semibold">{feature.split(':')[0]}:</span>
                  {feature.split(':')[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/50 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">Start Your Investment Journey</h2>
          <p className="text-gray-300 mb-8">
            Investing in gold is a powerful way to diversify your portfolio and safeguard your financial future. At GoldInvestPro, we're here to simplify the process, offering solutions that combine stability, growth potential, and peace of mind.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gold hover:bg-gold-dark text-black font-semibold"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate("/contact")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;